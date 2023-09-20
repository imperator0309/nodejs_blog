const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/CoursesController');

router.get('/create', coursesController.create);
router.get('/:slug', coursesController.show);
router.get('/:id/edit', coursesController.edit)

router.put('/:id', coursesController.update)

router.post('/store', coursesController.store);
router.post('/handle-form-actions', coursesController.handleFormActions);

router.patch('/:id/restore', coursesController.restore);

router.delete('/:id/force', coursesController.forceDelete);
router.delete('/:id', coursesController.delete);

module.exports = router;