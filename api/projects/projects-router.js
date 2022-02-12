// Write your "projects" router here!
const express = require('express');
const router = express.Router()
const Project = require('./projects-model')

const {
    checkBody,
    idExists
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



module.exports = router;