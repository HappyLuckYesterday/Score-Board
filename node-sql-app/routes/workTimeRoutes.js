const express = require('express');
const { getAllWorkTimes, getAllWorkTimesDetail, getWorkTimeById, createWorkTime, updateWorkTime, deleteWorkTime } = require('../controllers/workTimeController');
const router = express.Router();

router.get('/', getAllWorkTimes);
router.get('/:id', getWorkTimeById);
router.post('/', createWorkTime);
router.put('/:id', updateWorkTime);
router.delete('/:id', deleteWorkTime);
router.get('/detail/detail', getAllWorkTimesDetail);

module.exports = router;
