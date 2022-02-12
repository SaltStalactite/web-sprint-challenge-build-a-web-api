const Action = require('./actions-model')

function checkBody(req, res, next) {
    if (!req.body.notes || !req.body.description || !req.body.project_id) {
        next({ status: 400, message: 'Invalid request' })
    } else {
        next()
    }
}

async function idExists(req, res, next) {
    const { id } = req.params;
    const dbId = await Action.get(id)
    try {
        if (!dbId) {
            next({ status: 404, message: 'ID is not found' })
        } else {
            req.id = dbId
            next()
        }
    } catch (err) {
        next(err)
    }
}

function checkComplete(req, res, next) {
    if (req.body.completed === undefined) {
        next({ status: 400, message: 'please reply "YES/NO" to completed field' })
    } else {
        req.completed = req.body.completed
        if (
            req.body.completed === 'yes' ||
            req.body.completed === 'YES' ||
            req.body.completed === 'y' ||
            req.body.completed === 'T' ||
            req.body.completed === 'TRUE' ||
            req.body.completed === 't' ||
            req.body.completed === 'true' ||
            req.body.completed === true ||
            req.body.completed === 'Y'
        ) {
            req.completed = true
        }
        next()
    }
}

module.exports = {
    checkBody,
    idExists,
    checkComplete
}