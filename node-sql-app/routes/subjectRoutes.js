const express = require('express');
const { getAllSubjects, getSubjectById, updateSubject, deleteSubject } = require('../controllers/subjectController');
const router = express.Router();

router.get('/', getAllSubjects);
router.get('/:id', getSubjectById);
router.put('/:id', updateSubject);
router.delete('/:id', deleteSubject);

module.exports = router;
