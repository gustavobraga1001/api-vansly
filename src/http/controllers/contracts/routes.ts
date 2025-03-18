import { FastifyInstance } from 'fastify'
import { createContract } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { getContract } from './get-contract'
import { registerPayment } from './register-payments'
import { getPaymentsByDriverId } from './get-payments-by-driverid'
import { getStatistics } from './get-statistics'
import { getContractDriver } from './get-contracts-driver'
import { contractApprovalorRejection } from './contract-approval-or-rejection'

export async function contractRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/contracts', createContract)
  app.get('/get-contract', getContract)
  app.get('/get-contracts-driver/:type', getContractDriver)
  app.post('/register-payment', registerPayment)
  app.get('/get-payments/:mouth', getPaymentsByDriverId)
  app.get('/get-statistics', getStatistics)
  app.patch('/contract-stage', contractApprovalorRejection)
}
