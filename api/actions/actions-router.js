// Write your "actions" router here!
const express = require('express');

const router = express.Router()

const Action = require('./actions-model')

const {
    checkBody,
    idExists
} = require('./actions-middlware')

router.get('/', async (req, res, next) => {
    try {
        res.json(await Action.get())
    } catch (err) {
        next(err)
    }
})

router.get('/:id', idExists, async (req, res, next) => {
    try {
        res.json(req.id)
    } catch (err) {
        next(err)
    }
})

router.post('/', checkBody, async (req, res, next) => {
    const newAction = await Action.insert(req.body)
    try {
        res.json(newAction)
    } catch (err) {
        next(err)
    }
})

module.exports = router;