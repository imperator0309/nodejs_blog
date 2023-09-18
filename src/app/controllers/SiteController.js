const Course = require('../models/Courses');
const {multipleMongooseToObject} = require('../../ulti/mongoose');

class SiteController {

    //GET /search
    search(req, res) {
        res.render('search');
    }

    //GET /
    index(req, res, next) {
        Course.find({deleted: [null, false]})
            .then(courses => {   
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

module.exports = new SiteController;