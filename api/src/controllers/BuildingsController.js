const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class BuildingsController {
    async create(request, response) {
        const { name, address, city, state, zip_code, category, start_forecast, projected_area, built_area, land_area } = request.body
        const { client_id } = reques.params
        const user_id = request.user.id

        await knex("Clients")
            .andWhere({ id: client_id })
            .first()
            .catch(() => AppError("Invalid client ID.", 404))

        // // Check if client exists
        // if (!checkClientExists) {
        //     throw new AppError("Client not found.", 404);
        // }

        if (!name || !address || !city || !state || !zip_code || !category || !projected_area || !built_area || !land_area) {
            return AppError("Missing required fields to create a new building.", 400);
        }

        const checkBuildingExists = await knex("Buildings")
            .where({ user_id })
            .andWhere({ name })
            .first()

       // Check if building already exists
        if (checkBuildingExists) {
            return AppError("There is a building with this name already.", 400);
        }

        const building = await knex("Buildings")
            .insert({
                name,
                address,
                city,
                state,
                zip_code,
                user_id,
                category,
                start_forecast,
                projected_area,
                built_area,
                land_area,
                client_id,
                created_at: knex.fn.now(),
                updated_at: knex.fn.now()
            })
        return response.json(building)
    }
}

module.exports = BuildingsController;