import { beforeEach, describe, expect, it } from 'vitest'
import { CancelPaymentUseCase } from './cancel-payment'
import { InMemoryPaymentsRepository } from '@/repositories/in-memory/in-memory-payments-repository'
import { InMemoryContractsRepository } from '@/repositories/in-memory/in-memory-contracts-repository copy'

let contractsRepository: InMemoryContractsRepository
let payementRepository: InMemoryPaymentsRepository
let sut: CancelPaymentUseCase

describe('Cancel Payment Use Case', () => {
  beforeEach(() => {
    payementRepository = new InMemoryPaymentsRepository()
    contractsRepository = new InMemoryContractsRepository()
    sut = new CancelPaymentUseCase(payementRepository)
  })

  it('should be able to cancel a payment', async () => {
    const contract = await contractsRepository.create({
      boarding: 'St. Times Square, 2200',
      landing: 'St. Times Square, 2200',
      institution: 'Harvard',
      monthlyAmount: 400,
      period: 'MANHA',
      status: 'ACEITO',
      driver_id: 'driver-1',
      user_id: 'user-1',
    })

    const payment = await payementRepository.create({
      value: 400,
      mouth: 'FEV',
      contract: {
        connect: {
          id: contract.id,
        },
      },
    })

    await sut.execute({
      paymentId: payment.id,
    })
    const payments = await payementRepository.findByContractId(contract.id)
    expect(payments).toHaveLength(0)
  })
})
