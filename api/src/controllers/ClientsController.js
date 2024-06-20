const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class ClientsController {
    async create(request, response) {
        const { name, email, phone, address, city, state, zip_code } = request.body

        const { owner_id } = request.params

        if (!name || !email || !phone || !address || !city || !state || !zip_code) {
            return response.status(400).json({ error: 'Missing fields to create a new client.' })
        }

        const [note_id] = await knex('Clients').insert({ name, email, phone, address, owner_id, city, state, zip_code})

        return response.json()
    }
}

module.exports = ClientsController
