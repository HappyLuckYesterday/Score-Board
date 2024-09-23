const Score = require('../models/scoreModel');

const getAllScores = (req, res) => {
    const { pageNum = 1, pageSize = 10 } = req.query;
    Score.getAll(pageNum, pageSize, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const getScoreById = (req, res) => {
    const { id } = req.params;
    Score.getById(id, (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ message: 'Score not found' });
        res.json(results[0]);
    });
};

const updateScore = (req, res) => {
    const { id } = req.params;
    Score.update(id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Score updated successfully' });
    });
};

const deleteScore = (req, res) => {
    const { id } = req.params;
    Score.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Score deleted successfully' });
    });
};

module.exports = { getAllScores, getScoreById, updateScore, deleteScore };
