const { Router } = require('express')

const usersRouter = require('./users.routes')
const clientsRouter = require('./clients.routes')
const sessionsRouter = require('./sessions.routes')

const routes = Router()

routes.use('/users', usersRouter)
routes.use("/clients", clientsRouter)
routes.use("/sessions", sessionsRouter)

module.exports = routes