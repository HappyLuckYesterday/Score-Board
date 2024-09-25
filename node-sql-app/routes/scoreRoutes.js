const express = require('express');
const { getAllScores, getAllDetail, getScoreById, createScore, updateScore, deleteScore } = require('../controllers/scoreController');
const router = express.Router();

router.get('/detail/detail', getAllDetail);
router.get('/', getAllScores);
router.get('/:id', getScoreById);
router.post('/', createScore);
router.put('/:id', updateScore);
router.delete('/:id', deleteScore);

module.exports = router;
