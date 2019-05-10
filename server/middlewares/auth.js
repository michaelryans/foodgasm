const jwt = require('../helpers/jwt')

module.exports = function(req, res, next){
    if(req.headers.token){
        let decoded = jwt.verify(req.headers.token)
        req.headers.id = decoded.id
        next()
    } else {
        next({ message : 'Unauthenticate'})
    }
}