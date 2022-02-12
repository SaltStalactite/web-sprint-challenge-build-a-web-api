// Write your "projects" router here!
const express = require('express');
const router = express.Router()
const Project = require('./projects-model')

const {
    checkBody,
    idExists,
    checkComplete
} = require('./projects-middleware')

router.get('/', idExists, async (req, res, next) => {
    try {
        res.json(await Project.get())
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        res.json(await Project.get(id))
    } catch (err) {
        next(err)
    }
})

router.post('/', checkBody, async (req, res, next) => {
    const newProject = await Project.insert(req.body)
    try {
        res.json(newProject)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', idExists, checkBody, checkComplete, async (req, res, next) => {
    let changes = { ...req.body, completed: req.completed };
    const updateProject = await Project.update(req.id, changes)
    try {
        res.json(updateProject)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', idExists, async (req, res, next) => {
    try {
        res.json(await Project.remove(req.params.id))
    } catch (err) {
        next(err)
    }
})

router.get('/:id/actions', idExists, async (req, res, next) => {
    try {
        res.json(await Project.getProjectActions(req.id))
    } catch (err) {
        next(err)
    }
})

module.exports = router;