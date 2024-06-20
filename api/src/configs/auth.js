module.exports = {
    jwt: {
        secret: 'secret',
        options: {
            algorithm: 'HS256',
            expiresIn: '1h',
            issuer: 'author'
        }
    }
}