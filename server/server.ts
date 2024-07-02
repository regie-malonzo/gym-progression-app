import express from 'express'
import * as Path from 'node:path'

import exerciseRoutes from './routes/exercises.ts'
import recordRoutes from './routes/records.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/exercises', exerciseRoutes)
server.use('/api/v1/records', recordRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
