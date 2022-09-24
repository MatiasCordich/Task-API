require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const taskRoutes = require('./routes/TaskRoutes')

// Conectar con la DB

const mongoString = process.env.DATABASE_URL
const database = mongoose.connection

mongoose.connect(mongoString)

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected')
})


// Levantamos el servidor

const app = express()

const PORT = process.env.PORT || 8000

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`)
})

// Conectarnos con las rutas

app.use('/api/v1/tasks', taskRoutes)

