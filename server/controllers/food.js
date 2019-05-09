const Food = require('../models/food')
class FoodController {
    static create(req,res) {
        console.log('masuk ke sini')
        console.log(req.file)
        res.status(200).json(req.file.cloudStoragePublicUrl)
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