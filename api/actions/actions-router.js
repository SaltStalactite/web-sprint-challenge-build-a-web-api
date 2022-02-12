// Write your "actions" router here!
const express = require('express');

const router = express.Router()

const Action = require('./actions-model')

const {
    checkBody,
} = require('./actions-middlware')

router.get('/', async (req, res, next) => {
    try {
        res.json(await Action.get())
    } catch (err) {
        next(err)
    }
})

module.exports = router;