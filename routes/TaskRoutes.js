const express = require('express')

const router = express.Router()

const taskController = require('../controllers/TaskController')



// Obtener todas las tareas

router.get('/', taskController.getAllTasks)

// Obtener una tarea por Id

router.get('/:id', taskController.getOneTask)

// Crear una tarea

/**
 * @swagger
 * /api/v1/tasks:
 *     post:
 *       tags: 
 *          - Post Task
 *       summary: "Crear una nueva tarea"
 *       description: Este endpoint me permite crear una nueva tarea para despues agregarla a la BD
 *       requestBody:
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/Task"
 *       responses:
 *          '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Task'
 *          '400':
 *           description: Error! There are empty fields
 *           content:
 *             application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: FAILED
 *                    data:
 *                      type: object
 *                      properties:
 *                        error:
 *                          type: string
 *                          example: "There are empty fields"
 */


router.post('/', taskController.createNewTask)

// Editar una tarea por Id

router.patch('/:id', taskController.updateTask)

// Eliminar una tarea por Id

router.delete('/:id', taskController.deleteTask)

module.exports = router