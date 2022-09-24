const Task = require('../database/Task')

// Obtener todas las tareas

const getAllTasks = async (req, res) => {
    try {
        const allTasks = await Task.find()
        res.send({ status: 'Ok', data: allTasks })
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } })
    }
}

// Obtener tarea por ID 

const getOneTask = async (req, res) => {
    try {
        const oneTask = await Task.findById(req.params.id)
        res.send({ status: 'Ok', data: oneTask })
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } })
    }
}

// Crear una neuva tarea

const createNewTask = async (req, res) => {

    const { body } = req

    // Valido que no haya campos vacios en las tareas

    if (
        !body.title ||
        !body.author ||
        !body.subTasks ||
        !body.places
    ) {
        res.status(400).send({ status: "FAILED", data: { error: "There are empty fields. Please, fill them" } })
    }

    // Creo la nueva tarea

    const newTask = new Task({
        title: body.title,
        author: body.author,
        subTasks: body.subTasks,
        places: body.places
    })

    try {

        const createdTask = await newTask.save()

        res
            .status(200)
            .send({ status: 'OK', data: createdTask })

    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } })
    }
}

// Modificar una tarea

const updateTask = async (req, res) => {



    try {

        const { id } = req.params

        const taskToUpdate = req.body

        const options = { new: true }

        const taskUpdated = await Task.findByIdAndUpdate(id, taskToUpdate, options)

        res.send({ status: 'Ok', data: taskUpdated })

    } catch (error) {
        res
            .status(error?.status || 400)
            .send({ status: "FAILED", data: { error: error?.message || error } })
    }
}

// Eliminar una tarea

const deleteTask = async (req, res) => {

    try {
        const { id } = req.params

        await Task.findByIdAndDelete(id)

        res
            .status(200)
            .send({ status: "Ok", data: { message: "The task has been deleted" } })
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } })
    }

}

module.exports = { createNewTask, getAllTasks, getOneTask, updateTask, deleteTask }