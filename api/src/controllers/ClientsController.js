const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class ClientsController {
    async create(request, response) {
        const { name, email, phone, address, city, state, zip_code } = request.body
        const user_id = request.user.id

        if (!name || !email || !phone || !address || !city || !state || !zip_code) {
            return response.status(400).json({ error: 'Missing fields to create a new client.' })
        }

        const [client_id] = await knex('Clients').insert({ name, email, phone, address, owner_id:user_id, city, state, zip_code})

        return response.json()
    }
    
    async show(request, response) {
        const { client_id } = request.params

        const client = await knex("Clients")
          .select(
            "Clients.*",
            "owner.name as owner",
            "updater.name as updater"
          )
          .join("Users as owner", "Clients.owner_id", "owner.id")
          .leftJoin("Users as updater", "Clients.updated_by", "updater.id")
          .where("Clients.id", client_id)
          .first();


        if (!client) {
            throw new AppError('Client not found.', 404)
        }


        return response.json(client)
    }

    async update(request, response) {
        const { name, email, phone, address, city, state, zip_code } = request.body
        const { client_id } = request.params
        const user_id = request.user.id

        const client = await knex('Clients').where('id', client_id).first()

        if (!client) {
            throw new AppError('Client not found.', 404)
        }

        await knex('Clients').where('id', client_id).update({ name, email, phone, address, city, state, zip_code, updated_by: user_id })

        return response.json()
    }

    async delete(request, response) {
        const { client_id } = request.params
        const user_id = request.user.id

        const client = await knex('Clients').where('id', client_id).where('owner_id', user_id).first()

        if (!client) {
            throw new AppError('Client not found.', 404)
        }

        await knex('Clients').where('id', client_id).where('owner_id', user_id).delete()

        return response.json()
    }

    async index(request, response) {
        const clients = await knex("Clients")
          .select("Clients.*", "owner.name as owner", "updater.name as updater")
          .join("Users as owner", "Clients.owner_id", "owner.id")
          .leftJoin("Users as updater", "Clients.updated_by", "updater.id");

        return response.json(clients)
    }
}

module.exports = ClientsController
