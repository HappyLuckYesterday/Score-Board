const express = require('express');
const { getAllWorkTimes, getWorkTimeById, createWorkTime, updateWorkTime, deleteWorkTime } = require('../controllers/workTimeController');
const router = express.Router();

router.get('/', getAllWorkTimes);
router.get('/:id', getWorkTimeById);
router.post('/', createWorkTime);
router.put('/:id', updateWorkTime);
router.delete('/:id', deleteWorkTime);

module.exports = router;
