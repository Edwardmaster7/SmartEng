const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class BuildingsController {
  async create(request, response) {
    const {
      name,
      address,
      city,
      state,
      zip_code,
      category,
      start_forecast,
      projected_area,
      built_area,
      land_area,
    } = request.body;
    const { client_id } = request.params;
    const user_id = request.user.id;

    const checkClientExists = await knex("Clients")
      .where({ id: client_id })
      .first();

    // Check if client exists
    if (!checkClientExists) {
      throw new AppError("Client not found.", 404);
    }

    if (
      !name ||
      !address ||
      !city ||
      !state ||
      !zip_code ||
      !category ||
      !projected_area ||
      !built_area ||
      !land_area
    ) {
      throw new AppError(
        "Missing required fields to create a new building.",
        400
      );
    }

    const checkBuildingExists = await knex("Buildings").where({ name }).first();

    // Check if building already exists
    if (checkBuildingExists) {
      throw new AppError("There is a building with this name already.", 400);
    }

    await knex("Buildings").insert({
      name,
      address,
      owner_id: user_id,
      city,
      state,
      zip_code,
      category,
      start_forecast,
      projected_area,
      built_area,
      land_area,
      client_id,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    });
    return response.json();
  }

  async show(request, response) {
    const { building_id } = request.params;
    const user_id = request.user.id;

    const checkBuildingExists = await knex("Buildings")
      .where({ id: building_id })
      .where({ owner_id: user_id })
      .first();

    if (!checkBuildingExists) {
      throw new AppError("Building not found.", 404);
    }

    return response.json(building);
  }

  async update(request, response) {
    const {
      name,
      address,
      city,
      state,
      zip_code,
      category,
      start_forecast,
      projected_area,
      built_area,
      land_area,
    } = request.body;
    const { building_id } = request.params;
    const user_id = request.user.id;

    const checkBuildingExists = await knex("Buildings")
      .where({ id: building_id })
      .where({ owner_id: user_id })
      .first();

    if (!checkBuildingExists) {
      throw new AppError("Building not found.", 404);
    }

    await knex("Buildings")
      .where({ id: building_id })
      .where({ owner_id: user_id })
      .update({
        name,
        address,
        city,
        state,
        zip_code,
        category,
        start_forecast,
        projected_area,
        built_area,
        land_area,
        updated_by: user_id,
        updated_at: knex.fn.now(),
      });

    return response.json();
  }

  async delete(request, response) {
    const { building_id } = request.params;
    const user_id = request.user.id;

    const checkBuildingExists = await knex("Buildings")
      .where({ id: building_id })
      .where({ owner_id: user_id })
      .first();

    if (!checkBuildingExists) {
      throw new AppError("Building not found.", 404);
    }

    await knex("Buildings")
      .where({ id: building_id })
      .where({ owner_id: user_id })
      .del();

    return response.json();
  }

  async index(request, response) {
    const buildings = await knex("Buildings");

    return response.json(buildings);
  }

}

module.exports = BuildingsController;