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

//custom query helpers
Course.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
}

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    overrideMethods: ['delete'],
    deletedAt: true,
});

module.exports = mongoose.model('Course', Course);