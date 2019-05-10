const bcrypt = require('../helpers/bcrypt')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
    },
    password: {
        type: String
    }
});

userSchema.pre('save', function(next){
    this.password = bcrypt.generateHash(this.password)
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
