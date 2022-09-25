require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const taskRoutes = require('./routes/TaskRoutes')
const path = require('path')

// swagger

const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tasks API",
      version: "1.0.0",
      description: "Una API de tareas cuya gention de la la BD esta basada en los principios CRUD"
    },
    servers: [
      {
        url: "https://task-api-uiit.vercel.app"
      }
    ],
    tags: [
      {
        name: "api",
        description: "Este endpoint hace referecia a la API"
      },
      {
        name: "v1",
        description: "Este endpoint hace referecia a la version de la API"
      },
      {
        name: "tasks",
        description: "Este endpoint maneja la informacion relacionada con la BD de tareas"
      }
    ], 
    components: {
      schemas: {
        Task : {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "632dbac152d73e37dadb7998"
            },
            title: {
              type: "string",
              example: "Preparar el desayuno"
            },
            author: {
              type: "string",
              example: "Matias"
            },
            subTasks: {
              type: "array",
              items: {
                type: "string",
                example: ["Comprar leche, harina y huevos", "Comprar pan"]
              }
            },
            places: {
              type: "array",
              items: {
                type: "string",
                example: ["supermercado", "panaderia", "verduleria"]
              }
            }
          }
        }
      }
    }
  }, 
  apis: [`${path.join(__dirname, "./routes/TaskRoutes.js")}`]
}

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

// ruta del swagger

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

