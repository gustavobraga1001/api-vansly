import { FastifyReply, FastifyRequest } from 'fastify'
import path from 'path'
import fs from 'fs'

export async function getImage(request: FastifyRequest, reply: FastifyReply) {
  // Recebe o nome do arquivo via parâmetro da URL
  const { filename } = request.params as { filename: string }

  // Caminho completo do arquivo a ser retornado
  const filePath = path.join('uploads', filename)

  // Verifica se o arquivo existe
  if (!fs.existsSync(filePath)) {
    return reply.status(404).send({ message: 'File not found' })
  }

  // Envia a imagem como resposta (com o tipo de conteúdo apropriado)
  return reply.sendFile(filename, 'uploads')
}
