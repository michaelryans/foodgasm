const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tagSchema = new Schema({
    tag: {
        type: String
    },
    createdAt : {
        type: Date
    },
});
const Tag = mongoose.model('Tag', tagSchema)
module.exports = Tag