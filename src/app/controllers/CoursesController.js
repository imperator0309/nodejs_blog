const Courses = require('../models/Courses');
const {multipleMongooseToObject, mongooseToObject} = require('../../ulti/mongoose');

class CoursesController {
    
    //[GET] /courses/:slug
    show(req, res, next) {
        Courses.findOne({slug: req.params.slug})
            .then(course => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next)
    }

    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.img = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Courses(formData);
        course.save()
            .then(() => res.redirect(`/`))
            .catch(next);
    }
}

module.exports = new CoursesController;