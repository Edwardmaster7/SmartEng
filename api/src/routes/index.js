const { Router } = require('express')

const usersRouter = require('./users.routes')
const clientsRouter = require('./clients.routes')
const sessionsRouter = require('./sessions.routes')
const buildingsRouter = require('./buildings.routes')

const routes = Router()

routes.use('/users', usersRouter)
routes.use("/clients", clientsRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/buildings", buildingsRouter)

module.exports = routes