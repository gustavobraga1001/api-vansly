import fs from 'fs'
import path from 'path'
import { FastifyReply, FastifyRequest } from 'fastify'
import { v4 as uuidv4 } from 'uuid' // Importando o UUID para gerar nomes únicos

export async function uploadImage(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const file = await request.file() // Obtém o arquivo do multipart

  if (!file) {
    return reply.status(400).send({ message: 'No file uploaded' })
  }

  // Caminho de destino onde o arquivo será salvo
  const uploadDir = 'uploads/'

  // Garante que o diretório de uploads exista
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }

  // Gera um nome único para o arquivo, usando o UUID
  const uniqueFilename = `${uuidv4()}_${file.filename}`

  // Caminho completo do arquivo a ser salvo
  const filePath = path.join(uploadDir, uniqueFilename)

  // Faz o upload de forma assíncrona
  const stream = file.file
  const fileStream = fs.createWriteStream(filePath)

  // Copia os dados do arquivo para o diretório de uploads
  stream.pipe(fileStream)

  // Evento de término da escrita do arquivo
  fileStream.on('finish', () => {
    reply.send({ message: 'File uploaded successfully', filePath })
  })

  // Caso ocorra algum erro durante o upload
  fileStream.on('error', (err) => {
    reply
      .status(500)
      .send({ message: 'Error uploading file', error: err.message })
  })

  // Retorna o caminho completo da imagem (com nome único)
  return filePath
}
