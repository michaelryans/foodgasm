const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const foodSchema = new Schema({
    name: String,
    description: String,
    tags: [{type: Schema.Types.ObjectId, ref:'Tags'}],
    location: String,
});
const Food = mongoose.model('Food', foodSchema)
module.exports = Food