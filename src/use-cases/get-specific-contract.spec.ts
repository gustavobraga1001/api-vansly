import { InmemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InmemoryDriversRepository } from '@/repositories/in-memory/in-memory-drivers-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryContractsRepository } from '@/repositories/in-memory/in-memory-contracts-repository copy'
import { GetSpecificContractUseCase } from './get-specific-contract'

let usersRepository: InmemoryUsersRepository
let driverRepository: InmemoryDriversRepository
let contractsRepository: InMemoryContractsRepository
let sut: GetSpecificContractUseCase

describe('Get Specific Contract Use Case', () => {
  beforeEach(() => {
    usersRepository = new InmemoryUsersRepository()
    driverRepository = new InmemoryDriversRepository(usersRepository)
    contractsRepository = new InMemoryContractsRepository()

    sut = new GetSpecificContractUseCase(usersRepository, contractsRepository)
  })

  it('should be able to get a specific contract', async () => {
    const createdUser1 = await usersRepository.create({
      name: 'Jonw Doe',
      email: 'jonwdoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const createdDriver1 = await driverRepository.create({
      id: 'driver-1',
      cpf: '12345678900',
      cnh: '12345678900',
      user_id: createdUser1.id,
    })

    const createdUser2 = await usersRepository.create({
      name: 'Mark Mule',
      email: 'markmule@example.com',
      password_hash: await hash('654321', 6),
    })

    const createdContract = await contractsRepository.create({
      boarding: '2745 Mission St, San Francisco, CA 94110',
      landing: '2745 Mission St, San Francisco, CA 94110',
      institution: 'San Francisco State University (SFSU)',
      monthlyAmount: 400,
      period: 'TARDE',
      status: 'PENDENTE',
      driver_id: createdDriver1.id,
      user_id: createdUser2.id,
    })

    const contract = await sut.execute(createdContract.id)

    expect(contract.boarding).toEqual(
      '2745 Mission St, San Francisco, CA 94110',
    )
  })
})
