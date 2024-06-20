const { Router } = require('express')

const usersRoutes = require('./users.routes')
const clientsRoutes = require('./clients.routes')

const routes = Router()

routes.use('/users', usersRoutes)
routes.use("/clients", clientsRoutes)

module.exports = routes