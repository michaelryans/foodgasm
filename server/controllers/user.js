const userModel = require('../models/user')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const jwt = require('../helpers/jwt')
const bcrypt = require('../helpers/bcrypt')

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
                if( bcrypt.compareHash(password, data.password)){
                    let token = jwt.sign({id:data._id, email: data.email})
                    res.status(200).json({token, name:data.name})
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

    static googleSignIn(req, res, next){
        let payload
      
        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            payload = ticket.getPayload()
            return userModel.findOne({ email : payload.email})
        })
        .then( user => {
            if(user){
                let token =  jwt.sign({ email: user.email, id:user._id})
                res.status(200).json({token , name:user.name })
            } else {
                userModel.create({ email: payload.email, password: process.env.PASSWORD})
                .then( userData => {
                    let token =  jwt.sign({name : userData.name, email: userData.email, id:userData._id})
                    res.status(200).json({token , name:user.name })
                })
                .catch(err => {
                    next(err)
                })
            }
        })
        .catch( err =>{
            console.log(err)
            next(err)
        })
    }
}

module.exports = User