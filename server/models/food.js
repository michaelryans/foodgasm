const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const foodSchema = new Schema({
    name: String,
    description: String,
    image : String,
    tags: Array,
    location: String,
    likes: [],
    user_id: { type: Schema.Types.ObjectId, ref: 'User'}
});
const Food = mongoose.model('Food', foodSchema)
module.exports = Food