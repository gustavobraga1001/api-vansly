import { Driver, Prisma } from '@prisma/client'
import { DriversRepository } from '../drivers-repository'
import { InmemoryUsersRepository } from './in-memory-users-repository'
import { randomUUID } from 'crypto'

export class InmemoryDriversRepository implements DriversRepository {
  items: Driver[] = []

  constructor(private usersRepository: InmemoryUsersRepository) {}

  async create(data: Prisma.DriverUncheckedCreateInput) {
    const driver = {
      id: randomUUID(),
      cnh: data.cnh,
      cpf: data.cpf,
      user_id: data.user_id,
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
