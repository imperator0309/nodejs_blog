const Courses = require('../models/Courses');
const {multipleMongooseToObject, mongooseToObject} = require('../../ulti/mongoose');

class MeController {
    //[GET] /me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Courses.find({deleted: [null, false]}).sortable(req);

        Promise.all([courseQuery, Courses.countDocuments({deleted: true})])
            .then(([course, deletedCount]) => res.render('me/stored-courses', {
                deletedCount,
                course: multipleMongooseToObject(course),
            })
        )
        .catch(next);
    }
    
    //[GET] /me/trash/courses
    trashCourses(req, res, next) {
        Courses.find({deleted: true})
            .then(course => res.render('me/trash-courses', {
                course: multipleMongooseToObject(course)
            }))
            .catch(next);
    }
}

module.exports = new MeController;