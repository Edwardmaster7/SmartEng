const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')
const { sign } = require('jsonwebtoken')

class SessionsController {

    async create(request, response) {
        const { email, password } = request.body
        const user = await knex('Users').where('email', email).first()

        // console.log(user)
        if (!user) {
            throw new AppError('Email and/or password incorrect.', 401)
        }

        const passwordMatched = password === user.password ? true : false

        if (!passwordMatched) {
            throw new AppError('Email and/or password incorrect.', 401)
        }

        const { secret, expiresIn } = authConfig.jwt
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return response.json({ user, token })
    }
}

module.exports = SessionsController