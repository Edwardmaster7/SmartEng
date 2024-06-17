const AppError = require('../utils/AppError')

class UsersController {
    // A controller should have up to 5 methods
    /**
     * index - GET to list all users
     * show - GET to show one user
     * create - POST to create a user
     * update - PUT to update a user
     * delete - DELETE to delete a user
     */
    
    create(request, response) {
        const { name, email, password } = request.body

        const data = {
            name,
            email,
            password
        }
        
        if (!name || !email) {
          throw new AppError("Name and email are required.");
        }

        return response.status(201).json(data)
    }

}

module.exports = UsersController