const Food = require('../models/food')

class FoodController {
    static create(req,res, next) {
        const { name, caption, image, tags } = req.body //tambah key tag dari front end

        const create_obj = {
            image :req.file.cloudStoragePublicUrl, 
            tags : req.file.labels, 
            name, 
            caption, 
            image, 
            tags
        }
        create_obj.user_id = req.headers.id

        Food.create(create_obj)
        .then( data => {
            res.status(201).json(data)
        })
        .catch( err => {
            next(err)
        })
    }

    static upload(req,res,next) {
        const image_data = {image: req.file.cloudStoragePublicUrl, tags:req.file.labels}
        res.status(200).json(image_data)
    }

    static updateLike(req, res, next){
        const { id } = req.params
        const {user_id} = req.headers.id

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
    
    static findOne(req,res,next) {
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
            obj = { $or: [{'name' :{ $regex: search , $options: 'i' }} ,{ 'tags.description' : tag}] }
        }

        Food.find(obj)
        .populate({path:'user_id', select:['name', 'email']})
        .then(data => {
            res.status(200).json(data)
        })
        .catch( err =>{
            next(err)
        })
    }
    
    static updateOne(req,res, next) {
        const { id } = req.params
        const { name , caption, tags, location } = req.body
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
    
    static deleteOne(req,res, next) {
        const { id } = req.params
        Food.findOneAndDelete(id)
        .then( data => {
            res.status(200).json({_id : data._id})
        })
        .catch( err => {
            next(err)
        })
    }
    
}
module.exports = FoodController