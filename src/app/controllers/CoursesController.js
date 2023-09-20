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

    //[GET] /courses/:id/edit
    edit(req, res, next) {
        Courses.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course),
            }))
            .catch(next);
    }

    //[POST] /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.img = `https://img.youtube.com/vi/${req.body.videoId}/default.jpg`;
        formData.deleted = null;
        const course = new Courses(formData);
        course.save()
            .then(() => res.redirect('/'))
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Courses.updateOne({_id: req.params.id},req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[DELETE] /courses/:id
    delete(req, res, next) {
        Courses.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] /courses/:id/force
    forceDelete(req, res, next) {
        Courses.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATCH] /course/:id/restore
    restore(req, res, next) {
        Courses.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] /course/handle-form-action
    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Courses.delete({_id: {$in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({message: 'Action is Invalid'});   
        }
    }
}

module.exports = new CoursesController;