const express = require('express');
const { getAllScores, getScoreById, createScore, updateScore, deleteScore } = require('../controllers/scoreController');
const router = express.Router();

router.get('/', getAllScores);
router.get('/:id', getScoreById);
router.post('/', createScore);
router.put('/:id', updateScore);
router.delete('/:id', deleteScore);

module.exports = router;
