const Food = require('../models/food')
class FoodController {
    static create(req,res) {
        console.log('masuk ke sini')
        res.status(200).json('masuk ke controller')
    }
    
    static findOne(req,res) {

    }
    
    static findAll(req,res) {

    }
    
    static updateOne(req,res) {

    }
    
    static deleteOne(req,res) {

    }
    
}
module.exports = FoodController