const express = require('express');
const router = express.Router();
const {
    getAllStudents,
    getSingleStudent,
    postStudent,
    putStudent,
    patchStudent,
    deleteStudent
} = require('../controllers/students')

// All router //

// router.get('/', getAllStudents);
// router.post('/', getSingleStudent)
// router.put('/:id', putStudent)
// router.patch('/:id', patchStudent)
// router.delete('/:id', deleteStudent)

router.route('/').get(getAllStudents).post(postStudent);
router.route('/:id').get(getSingleStudent).put(putStudent).patch(patchStudent).delete(deleteStudent);

module.exports = router;