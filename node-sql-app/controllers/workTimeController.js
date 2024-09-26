const WorkTime = require('../models/workTimeModel');

const getAllWorkTimes = (req, res) => {
    const { pageNum = 1, pageSize = 10000 } = req.query;
    WorkTime.getAll(pageNum, pageSize, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const getAllWorkTimesDetail = (req, res) => {
    const { pageNum = 1, pageSize = 10000 } = req.query;
    WorkTime.getAllDetail(pageNum, pageSize, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const getWorkTimeById = (req, res) => {
    const { id } = req.params;
    WorkTime.getById(id, (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ message: 'Work time entry not found' });
        res.json(results[0]);
    });
};

const createWorkTime = (req, res) => {
    WorkTime.create(req.body, (err, data) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Work time entry created successfully', id: data.insertId });
    });
};

const updateWorkTime = (req, res) => {
    const { id } = req.params;
    WorkTime.update(id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Work time entry updated successfully' });
    });
};

const deleteWorkTime = (req, res) => {
    const { id } = req.params;
    WorkTime.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Work time entry deleted successfully' });
    });
};

module.exports = { getAllWorkTimes, getAllWorkTimesDetail, getWorkTimeById, createWorkTime, updateWorkTime, deleteWorkTime };
