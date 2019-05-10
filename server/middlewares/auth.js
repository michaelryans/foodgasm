const jwt = require('../helpers/jwt')
const Food = require('../models/food')

module.exports = {
    authenticate(req, res, next){
        if(req.headers.token){
            let decoded = jwt.verify(req.headers.token)
            req.headers.id = decoded.id
            next()
        } else {
            next({ message : 'Unauthenticate'})
        }
    },
    authorization(req,res,next) {
        Food.findOne({_id: req.params.id, user_id: req.decoded.id})
        .then(found => {
            if(found) {
                next()
            } else {
                next({message: `Unauthorize`})
            }
        })
        .catch(err => {
            next({message: err.message})
        })
    }
}