import path from 'path'
import fs from 'fs'
import fastifyMulter from 'fastify-multer'
import multer from 'multer'

// Defina a pasta de upload
const uploadDir = path.resolve('uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Configuração do Multer
export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, uploadDir) // Define o diretório de upload
    },
    filename: (req, file, callback) => {
      const time = new Date().getTime()
      callback(null, `${time}_${file.originalname}`) // Nome do arquivo com timestamp
    },
  }),
}).single('file') // Certifique-se de que o campo de arquivo seja 'file'
