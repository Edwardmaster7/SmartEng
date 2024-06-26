const { Router } = require("express");

const BuildingsController = require("../controllers/BuildingsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const buildingsRoutes = Router();

const buildingsController = new BuildingsController();
buildingsRoutes.use(ensureAuthenticated);

buildingsRoutes.post("/", buildingsController.create);
// buildingsRoutes.put("/:note_id", buildingsController.update);
// buildingsRoutes.get("/:note_id", buildingsController.show);
// buildingsRoutes.get("/", buildingsController.index);
// buildingsRoutes.delete("/:note_id", buildingsController.delete);

module.exports = buildingsRoutes;