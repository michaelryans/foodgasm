const bcrypt = require('bcryptjs')

module.exports = {
    generateHash(password){
        return bcrypt.hashSync(password, 10)
    },
    compareHash(password, passwordDB){
        return bcrypt.compareSync(password, passwordDB)
    }
}