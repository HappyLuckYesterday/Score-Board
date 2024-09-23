const Group = require('../models/groupModel');

const getAllGroups = (req, res) => {
    const { pageNum = 1, pageSize = 10 } = req.query;
    Group.getAll(pageNum, pageSize, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const getGroupById = (req, res) => {
    const { id } = req.params;
    Group.getById(id, (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ message: 'Group not found' });
        res.json(results[0]);
    });
};

const updateGroup = (req, res) => {
    const { id } = req.params;
    Group.update(id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Group updated successfully' });
    });
};

const deleteGroup = (req, res) => {
    const { id } = req.params;
    Group.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Group deleted successfully' });
    });
};

module.exports = { getAllGroups, getGroupById, updateGroup, deleteGroup };
