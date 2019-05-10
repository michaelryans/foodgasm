const bcrypt = require('../helpers/bcrypt')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        validate: [{
            validator(email) {
                return User.findOne({email})
                .then(found => {
                    if (found) return false;
                })
            },
            message: 'please use valid email address'
        }, {
            validator(email) {
                const regex = /\S+@\S+\.\S+/
                return regex.test(email)
            },
            message: ' please enter valid email adress'
        }]
    },
    password: {
        type: String,
        required: [true, 'password must not be empty']
    }
});

userSchema.pre('save', function(next){
    this.password = bcrypt.generateHash(this.password)
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
