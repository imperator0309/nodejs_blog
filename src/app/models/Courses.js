const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, minLength: 2, required: true },
    description: { type: String },
    img: { type: String },
    slug: {type: String, slug: 'name', unique: true},
    videoId: {type: String},
}, {
    timestamps: true,
});

module.exports = mongoose.model('Course', Course);