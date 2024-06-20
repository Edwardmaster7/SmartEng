const { Router } = require("express")

const ClientsController = require("../controllers/ClientsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const clientsRoutes = Router()

const clientsController = new ClientsController()
clientsRoutes.use(ensureAuthenticated)

clientsRoutes.post("/", clientsController.create)
// clientsRoutes.put("/:id", clientsController.update)
clientsRoutes.get("/:note_id", clientsController.show)
// clientsRoutes.delete("/:id", clientsController.delete)

module.exports = clientsRoutes
