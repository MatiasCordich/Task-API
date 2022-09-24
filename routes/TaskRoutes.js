const express = require('express')

const router = express.Router()

const taskController = require('../controllers/TaskController')

// Obtener todas las tareas

router.get('/', taskController.getAllTasks)

// Obtener una tarea por Id

router.get('/:id', taskController.getOneTask)

// Crear una tarea

router.post('/', taskController.createNewTask)

// Editar una tarea por Id

router.patch('/:id', taskController.updateTask)

// Eliminar una tarea por Id

router.delete('/:id', taskController.deleteTask)

module.exports = router