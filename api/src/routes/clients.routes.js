const { Router } = require("express")

const ClientsController = require("../controllers/ClientsController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const clientsRoutes = Router()

const clientsController = new ClientsController()
// clientsRoutes.use(ensureAuthenticated)

clientsRoutes.post("/", ensureAuthenticated, clientsController.create)
clientsRoutes.put("/:client_id", ensureAuthenticated, clientsController.update)
clientsRoutes.get("/:client_id", clientsController.show)
clientsRoutes.get("/", clientsController.index);
clientsRoutes.delete("/:client_id", ensureAuthenticated, clientsController.delete)


module.exports = clientsRoutes
