const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const path = require('path')

const swaggerData = {
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

const swaggerSpec = swaggerJsDoc(swaggerData)

const swaggerDocs = (app, port) => {
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get('/api/v1/docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpec)
    })

    console.log(`Version 1 Docs are available at http://localhost:${port}/api/v1/docs `)
}

module.exports = {swaggerDocs}