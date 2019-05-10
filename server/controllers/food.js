const Food = require('../models/food')

class FoodController {
    static create(req,res, next) {
        Food.create({ image :req.file.cloudStoragePublicUrl, tags : req.file.labels })
        .then( data => {
            res.status(201).json(data)
        })
        .catch( err => {
            next(err)
        })
    }

    static updateLike(req, res, next){
        const { id } = req.params
        const {user_id} = req.query

        Food.findOne({ _id : id })
        .then( data => {
            if(data.likes.includes(user_id)){
                let index = data.likes.indexOf(user_id)
                data.likes.splice(index, 1)
            } else {
                data.likes.push(user_id)
                res.status(200).json(data)
            }
            return data.save()
        })
        .then( data => {
            res.status(200).json(data)
        })
        .catch( err =>{
            console.log(err)
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
        const { name , caption, likes, tags, location } = req.body
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