const userModel = require('../models/user')

class User {
    static createUser(req, res, next){
            const {name, email, password} = req.body
    
            userModel.create({name , email, password})
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
        }
    
    static postLogin(req, res, next){
        const {email, password} = req.body

        userModel.findOne({email})
        .then(data => {
            if(data){
                if(Helper.compareHash(password, data.password)){
                    let token = Helper.generateJWT({id:data._id, email: data.email})
                    res.status(200).json({token})
                } else {
                    next({message : `incorrect username/password`})
                }
            } else {
                next({message : `user not yet registered`})
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = User