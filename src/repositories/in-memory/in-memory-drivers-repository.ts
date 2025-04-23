import { Driver, Prisma } from '@prisma/client'
import { DriversRepository } from '../drivers-repository'
import { InmemoryUsersRepository } from './in-memory-users-repository'

export class InmemoryDriversRepository implements DriversRepository {
  items: Driver[] = []

  constructor(private usersRepository: InmemoryUsersRepository) {}

  async create(data: Prisma.DriverUncheckedCreateInput) {
    const driver = {
      id: 'driver-1',
      cnh: data.cnh,
      cpf: data.cpf,
      user_id: 'user-1',
    }

    this.items.push(driver)

    return driver
  }

  async findById(idDriver: string) {
    const driver = this.items.find((item) => item.id === idDriver)

    if (!driver) {
      return null
    }

    return driver
  }

  async findByUserId(userId: string) {
    const driver = this.items.find((item) => item.user_id === userId)
    if (!driver) {
      return null
    }

    const user = await this.usersRepository.findById(userId)
    if (!user) {
      return null
    }

    return { user, driver }
  }
}
