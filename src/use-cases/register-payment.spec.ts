import { describe, it, expect, vi, beforeEach } from 'vitest'
import { RegisterPaymentUseCase } from './register-payment'
import { ContractsRepository } from '@/repositories/contratcs-repository'
import { PrismaPaymentsRepository } from '@/repositories/prisma/prisma-payments-repository'

describe('RegisterPaymentUseCase', () => {
  let contractsRepository: ContractsRepository
  let paymentsRepository: PrismaPaymentsRepository
  let registerPaymentUseCase: RegisterPaymentUseCase

  beforeEach(() => {
    contractsRepository = {
      // Mock vazio, já que não estamos testando esse repositório diretamente
    } as any

    paymentsRepository = {
      create: vi.fn().mockResolvedValue({
        id: 'payment-id',
        contract: { id: 'contract-id' },
        value: 1000,
        mouth: 'January',
        payment_at: new Date(),
      }),
    } as any

    registerPaymentUseCase = new RegisterPaymentUseCase(
      contractsRepository,
      paymentsRepository,
    )
  })

  it('deve registrar um pagamento com sucesso', async () => {
    const input = {
      contract_id: 'contract-id',
      value: 1000,
      mouth: 'January',
    }

    const payment = await registerPaymentUseCase.execute(input)

    expect(payment).toEqual({
      id: 'payment-id',
      contract: { id: 'contract-id' },
      value: 1000,
      mouth: 'January',
      payment_at: expect.any(Date),
    })

    expect(paymentsRepository.create).toHaveBeenCalledOnce()
    expect(paymentsRepository.create).toHaveBeenCalledWith({
      contract: { connect: { id: 'contract-id' } },
      value: 1000,
      mouth: 'January',
      payment_at: expect.any(Date),
    })
  })
})
