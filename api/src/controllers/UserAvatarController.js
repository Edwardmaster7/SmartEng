const knex = require('../database/knex')
const DiskStorage = require('../providers/DiskStorage')
const path = require('path')

class UserAvatarController {

    async update(request, response) {
        const user_id = request.user.id
        const avatarFilename = request.file.filename

        const diskStorage = new DiskStorage()

        const user = await knex('Users').where('id', user_id).first()

        if (!user) {
            throw new AppError('Only authenticated users can change avatar', 401)
        }

        if (user.avatar) {
           await diskStorage.deleteFile(user.avatar)
        }

        const filename = await diskStorage.saveFile(avatarFilename)
        user.avatar = avatarFilename

        await knex('Users').where('id', user_id).update(user)

        return response.json(user)
    }
}

module.exports = UserAvatarController