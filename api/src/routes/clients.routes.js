const { Router } = require("express");

const ClientsController = require("../controllers/ClientsController");

const clientsRoutes = Router();

const clientsController = new ClientsController();

clientsRoutes.post("/:owner_id", clientsController.create);
// clientsRoutes.put("/:id", clientsController.update);

module.exports = clientsRoutes;
