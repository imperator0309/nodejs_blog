const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema({
    course_name: { type: String, minLength: 2, required: true },
    description: { type: String },
    img: { type: String },
    videoId: {type: String},
    slug: {type: String, slug: 'course_name'},
}, {
    timestamps: true,
});

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    overrideMethods: ['delete'],
    deletedAt: true,
});

module.exports = mongoose.model('Course', Course);