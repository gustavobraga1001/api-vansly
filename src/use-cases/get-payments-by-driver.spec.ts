import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPaymentsRepository } from '@/repositories/in-memory/in-memory-payments-repository'
import { InMemoryContractsRepository } from '@/repositories/in-memory/in-memory-contracts-repository copy'
import { GetPaymentsByDriverId } from './get-payments-by-driver'
import { InmemoryDriversRepository } from '@/repositories/in-memory/in-memory-drivers-repository'
import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'

let contractsRepository: InMemoryContractsRepository
let payementRepository: InMemoryPaymentsRepository
let driversRepository: InmemoryDriversRepository
let usersRepository: InmemoryUsersRepository
let sut: GetPaymentsByDriverId

describe('Get Payments By Driver Use Case', () => {
  beforeEach(() => {
    payementRepository = new InMemoryPaymentsRepository()
    contractsRepository = new InMemoryContractsRepository()
    usersRepository = new InmemoryUsersRepository()
    driversRepository = new InmemoryDriversRepository(usersRepository)
    sut = new GetPaymentsByDriverId(
      contractsRepository,
      payementRepository,
      driversRepository,
      usersRepository,
    )
  })

  it('should be able to get all payments by driver', async () => {
    const createdUser = await usersRepository.create({
      name: 'Jonw Doe',
      email: 'jonwdoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const createdDriver = await driversRepository.create({
      cpf: '12345678900',
      cnh: '12345678900',
      user_id: createdUser.id,
    })

    const contract = await contractsRepository.create({
      boarding: 'St. Times Square, 2200',
      landing: 'St. Times Square, 2200',
      institution: 'Harvard',
      monthlyAmount: 400,
      period: 'MANHA',
      status: 'ACEITO',
      driver_id: createdDriver.id,
      user_id: 'user-1',
    })

    const contract2 = await contractsRepository.create({
      boarding: 'St. Times Square, 2300',
      landing: 'St. Times Square, 2300',
      institution: 'Harvard',
      monthlyAmount: 400,
      period: 'TARDE',
      status: 'ACEITO',
      driver_id: createdDriver.id,
      user_id: 'user-2',
    })

    await payementRepository.create({
      value: 400,
      mouth: 'FEV',
      contract: {
        connect: {
          id: contract.id,
        },
      },
    })

    await payementRepository.create({
      value: 400,
      mouth: 'FEV',
      contract: {
        connect: {
          id: contract2.id,
        },
      },
    })

    const payments = await sut.execute({
      userId: createdUser.id,
      mouth: 'FEV',
    })

    expect(payments).toHaveLength(2)
  })
})
