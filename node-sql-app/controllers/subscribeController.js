const Subscribe = require('../models/subscribeModel');

const getAllSubscribes = (req, res) => {
    const { pageNum = 1, pageSize = 10 } = req.query;
    Subscribe.getAll(pageNum, pageSize, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const getSubscribeById = (req, res) => {
    const { id } = req.params;
    Subscribe.getById(id, (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ message: 'Subscribe not found' });
        res.json(results[0]);
    });
};

const updateSubscribe = (req, res) => {
    const { id } = req.params;
    Subscribe.update(id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Subscribe updated successfully' });
    });
};

const deleteSubscribe = (req, res) => {
    const { id } = req.params;
    Subscribe.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Subscribe deleted successfully' });
    });
};

module.exports = { getAllSubscribes, getSubscribeById, updateSubscribe, deleteSubscribe };
