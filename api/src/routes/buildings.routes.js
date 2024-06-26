const { Router } = require("express");

const BuildingsController = require("../controllers/BuildingsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const buildingsRoutes = Router();

const buildingsController = new BuildingsController();
buildingsRoutes.use(ensureAuthenticated);

buildingsRoutes.post("/:client_id", buildingsController.create);
buildingsRoutes.put("/:building_id", buildingsController.update);
buildingsRoutes.get("/:building_id", buildingsController.show);
buildingsRoutes.get("/", buildingsController.index);
buildingsRoutes.delete("/:building_id", buildingsController.delete);

module.exports = buildingsRoutes;