const Food = require('../models/food')
class FoodController {
    static create(req,res, next) {
        console.log('masuk ke sini')
        console.log(req.file,'==============================')
        res.status(200).json({ image :req.file.cloudStoragePublicUrl, labels : req.file.labels})
    }

    static updateLike(req, res, next){
        const { id } = req.params

        Food.findOne({ likes : id})
        .then( data => {
            if(data){
                data.likes.push(id)
                res.status(200).json(data)
            } else {
                let index = likes.indexOf(id)
                data.likes.splice(index, 1)
                res.status(200).json(data)
            }
        })
        .catch( err =>{
            next(err)
        })
    }
    
    static findOne(req,res) {
        const { id } = req.params
        
        Food.findOne({id})
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next( err )
        })
    }
    
    static getAll( req, res, next){
        let { tag, search } = req.query
        let obj = {}

        if( tag || search ){ 

            search = new RegExp(`${search}.+`) 
           
            obj = { $or: [{'title' :{ $regex: search , $options: 'i' }} ,{ 'tags.text' : tag}] }
        }

        Food.find(obj)
        .then(data => {
            res.status(200).json(data)
        })
        .catch( err =>{
            next(err)
        })
    }
    
    static updateOne(req,res) {
        const { id } = req.params
        const { name , caption, likes, tags, location} = req.body
        let obj = { name , caption, likes, tags, location}

        Object.keys(obj).map( el => {
            if( obj[el] == null) {
                delete obj[el]
            }
        })
        
        Food.findOneAndUpdate({ _id:id }, obj, {new : true})
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err => {
            next(err)
        })
    }
    
    static deleteOne(req,res) {
        const { id } = req.params
        Food.deleteOne(id)
        .then( data => {
            res.status(204).json()
        })
        .catch( err => {
            next(err)
        })
    }
    
}
module.exports = FoodController