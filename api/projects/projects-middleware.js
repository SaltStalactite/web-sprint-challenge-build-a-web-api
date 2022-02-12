const Project = require('./projects-model')

module.exports = {
    checkBody,
    idExists,
    checkComplete
}

function checkBody(req, res, next) {
    try {
        if (!req.body.name || !req.body.description) {
            next({ status: 400, message: 'Not a valid request' })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

async function idExists(req, res, next) {
    const { id } = req.params;
    const dbId = await Project.get(id)
    try {
        if (!dbId) {
            next({ status: 404, message: 'ID was not found' })
        } else {
            req.id = id
            next()
        }
    } catch (err) {
        next(err)
    }
}

function checkComplete(req, res, next) {
    if (req.body.completed === undefined) {
        next({ status: 400, message: 'please reply "YES" to completed field' })
    } else {
        req.completed = req.body.completed
        next()
    }
}