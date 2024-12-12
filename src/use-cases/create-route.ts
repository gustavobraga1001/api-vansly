import { AbsenceRepository } from '@/repositories/absence-repository'
import { ContractsRepository } from '@/repositories/contratcs-repository'
import { RoutesRepository } from '@/repositories/routes-repository'
import { RoutesStopsRepository } from '@/repositories/routes-stops-repository'
import { StopsRepository } from '@/repositories/stops-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { VehiclesRepository } from '@/repositories/vehicles-repository'

interface CreateRouteUseCaseRequest {
  driverId: string
  date: Date
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
  ) {}

  async execute({ driverId, date }: CreateRouteUseCaseRequest) {
    // Encontrar o veículo do motorista
    const vehicle = await this.vehiclesRepository.findByDriverId(driverId)

    if (!vehicle) {
      throw new Error('Veículo não encontrado')
    }

    // Buscar contratos ativos do motorista
    const activeContracts =
      await this.contractRepository.findActiveContractsByDriverId(driverId)

    if (!activeContracts) {
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

    console.log(usersWithoutAbsences) // Exibe o array final com o name e boarding (endereço)

    // Criando a rota para o motorista
    const route = await this.routesRepository.create({
      period: 'MORNING', // Ajuste conforme necessário
      date,
      driver_id: driverId,
      vehicle_id: vehicle.id,
    })

    // Criando os stops para os usuários sem faltas
    const stops = await Promise.all(
      usersWithoutAbsences.map(async (user) => {
        return await this.stopsRepository.create({
          adress: user.boarding, // Usando boarding (endereço)
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
  }
}