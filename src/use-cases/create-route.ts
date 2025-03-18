import { ContractsRepository } from '@/repositories/contratcs-repository'
import { AbsenceRepository } from '@/repositories/absence-repository'
import { DriversRepository } from '@/repositories/drivers-repository'
import { RoutesRepository } from '@/repositories/routes-repository'
import { RoutesStopsRepository } from '@/repositories/routes-stops-repository'
import { StopsRepository } from '@/repositories/stops-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { VehiclesRepository } from '@/repositories/vehicles-repository'

export enum Period {
  MANHA = 'MANHA',
  TARDE = 'TARDE',
  NOITE = 'NOITE',
}

interface CreateRouteUseCaseRequest {
  userId: string
  date: Date
  period: Period
}

export class CreateRouteUseCase {
  constructor(
    private absenceRepository: AbsenceRepository,
    private usersRepository: UsersRepository,
    private contractRepository: ContractsRepository,
    private routesRepository: RoutesRepository,
    private vehiclesRepository: VehiclesRepository,
    private stopsRepository: StopsRepository,
    private routesStopsRepository: RoutesStopsRepository,
    private driversRepository: DriversRepository,
  ) {}

  async execute({ userId, date, period }: CreateRouteUseCaseRequest) {
    const routesExistsWithSameDateAndPeriod =
      await this.routesRepository.findByDateAndPeriod(date, period)

    if (routesExistsWithSameDateAndPeriod) {
      throw new Error('Já existe uma rota para essa data e periodo')
    }

    const driverByUserId = await this.driversRepository.findByUserId(userId)

    console.log(driverByUserId?.driver)

    if (!driverByUserId || driverByUserId.driver === null) {
      throw new Error('Motorista não encontrado')
    }

    // Encontrar o veículo do motorista
    const vehicle = await this.vehiclesRepository.findByDriverId(
      driverByUserId.driver.id,
    )

    if (!vehicle) {
      throw new Error('Veículo não encontrado')
    }

    const activeContracts =
      await this.contractRepository.findActiveContractsByDriverIdAndPeriod(
        driverByUserId.driver.id,
        period,
      )

    if (activeContracts.length <= 0) {
      throw new Error('Nenhum contrato ativo encontrado para este motorista')
    }

    // Coletar as informações de usuário e o boarding (endereço) dos contratos
    const userInfos = activeContracts.map((contract) => ({
      userId: contract.user_id,
      boarding: contract.boarding, // Usando boarding como o address
    }))

    // Buscar usuários sem faltas para o dia
    const usersWithoutAbsences = await Promise.all(
      userInfos.map(async (userInfo) => {
        const user = await this.usersRepository.findById(userInfo.userId)
        const absence = await this.absenceRepository.findByUserIdAndDate(
          userInfo.userId,
          date,
        )
        return { user: { ...user, boarding: userInfo.boarding }, absence }
      }),
    ).then((results) => {
      // Filtra os usuários que não têm falta
      const usersWithNoAbsence = results.filter((item) => !item.absence)
      return usersWithNoAbsence.map((item) => ({
        userId: item.user?.id,
        name: item.user?.name,
        boarding: item.user?.boarding, // Agora usando boarding como address
      }))
    })

    // Criando a rota para o motorista
    const route = await this.routesRepository.create({
      period, // Ajuste conforme necessário
      date,
      driver_id: driverByUserId.driver.id,
      vehicle_id: vehicle.id,
    })

    // Criando os stops para os usuários sem faltas
    const stops = await Promise.all(
      usersWithoutAbsences.map(async (user) => {
        return await this.stopsRepository.create({
          address: user.boarding, // Usando boarding (endereço)
          status: false, // Ajuste conforme necessário
        })
      }),
    )

    stops.map(async (stop) => {
      await this.routesStopsRepository.create({
        route_id: route.id,
        stop_id: stop.id,
      })
    })

    return { route }
  }
}
