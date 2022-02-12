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

module.exports = {
    checkBody,
    idExists
}