const knex = require('../database/knex')
const AppError = require('../utils/AppError')

class ClientsController {
    async create(request, response) {
        const { name, email, phone, address, city, state, zip_code } = request.body
        const user_id = request.user.id

        if (!name || !email || !phone || !address || !city || !state || !zip_code) {
            return response.status(400).json({ error: 'Missing fields to create a new client.' })
        }

        const [note_id] = await knex('Clients').insert({ name, email, phone, address, owner_id:user_id, city, state, zip_code})

        return response.json()
    }
    
    async show(request, response) {
        const { note_id } = request.params
        const user_id = request.user.id

        const client = await knex('Clients').where('id', note_id).where('owner_id', user_id).first()

        if (!client) {
            throw new AppError('Client not found.', 404)
        }

        return response.json(client)
    }
}

module.exports = ClientsController
