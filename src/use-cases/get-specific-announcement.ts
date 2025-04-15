import { AnnouncementRepository } from '@/repositories/announcement-repository'
import { ContractsRepository } from '@/repositories/contratcs-repository'
import { DriversRepository } from '@/repositories/drivers-repository'
import { ImageRepository } from '@/repositories/image-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { VehiclesRepository } from '@/repositories/vehicles-repository'
import { Contract, Driver } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

interface GetAnnouncementsResponse {
  announcement: {
    id: string
    title: string
    stars: number
    city: string
    monthlyAmount: number
    images: string[] | null
    driver: Driver & {
      name: string
    }
    vehicle: {
      model: string
      capacityVehicle: { Manha: number; Tarde: number; Noite: number }
    }
  }
}

export class GetSpecificAnnouncementUseCase {
  constructor(
    private announcementRepository: AnnouncementRepository,
    private driversRepository: DriversRepository,
    private vehiclesRepository: VehiclesRepository,
    private usersRepository: UsersRepository,
    private imageRepository: ImageRepository,
    private contractsRepository: ContractsRepository,
  ) {}

  async execute(announcementId: string): Promise<GetAnnouncementsResponse> {
    const announcement =
      await this.announcementRepository.findById(announcementId)

    if (!announcement) {
      throw new Error('Announcement not found')
    }

    // Buscando driver e vehicle em paralelo
    const [driver, vehicle] = await Promise.all([
      this.driversRepository.findById(announcement.driver_id),
      this.vehiclesRepository.findById(announcement.vehicle_id),
    ])

    const images = await this.imageRepository.findByAnnouncementId(
      announcement.id,
    )

    if (!driver || !vehicle) {
      throw new Error('Driver or vehicle not found')
    }

    // Inicializa as variáveis para armazenar a capacidade restante por período
    let capacityManha = vehicle.total_capacity.toNumber() // Capacidade dividida por 3 períodos
    let capacityTarde = vehicle.total_capacity.toNumber()
    let capacityNoite = vehicle.total_capacity.toNumber()

    const contracts =
      await this.contractsRepository.findActiveContractsByDriverId(driver.id)

    // Percorre todos os contratos e subtrai a quantidade de cada período
    contracts.forEach((contract: Contract) => {
      switch (contract.period) {
        case 'MANHA':
          capacityManha -= 1 // Subtrai 1 para cada contrato no período manhã
          break
        case 'TARDE':
          capacityTarde -= 1 // Subtrai 1 para cada contrato no período tarde
          break
        case 'NOITE':
          capacityNoite -= 1 // Subtrai 1 para cada contrato no período noite
          break
        default:
          // Se o período não for um dos esperados, podemos ignorar ou lançar um erro
          break
      }
    })

    const capacityVehicle = {
      Manha: capacityManha,
      Tarde: capacityTarde,
      Noite: capacityNoite,
    }

    // Buscando o usuário associado ao driver
    const user = await this.usersRepository.findById(driver.user_id)

    if (!user) {
      throw new Error('User not found')
    }

    return {
      announcement: {
        id: announcement.id,
        title: announcement.title,
        stars: (announcement.stars as Decimal).toNumber(), // Converter Decimal para number
        city: announcement.city,
        monthlyAmount: (announcement.monthlyAmount as Decimal).toNumber(), // Converter Decimal para number
        images: images?.map((image) => image.url) || null,
        driver: {
          ...driver,
          name: user.name,
        },
        vehicle: {
          model: vehicle.model,
          capacityVehicle,
        },
      },
    }
  }
}
