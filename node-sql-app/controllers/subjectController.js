const Subject = require('../models/subjectModel');

const getAllSubjects = (req, res) => {
    const { pageNum = 1, pageSize = 10 } = req.query;
    Subject.getAll(pageNum, pageSize, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

const getSubjectById = (req, res) => {
    const { id } = req.params;
    Subject.getById(id, (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ message: 'Subject not found' });
        res.json(results[0]);
    });
};

const updateSubject = (req, res) => {
    const { id } = req.params;
    Subject.update(id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Subject updated successfully' });
    });
};

const deleteSubject = (req, res) => {
    const { id } = req.params;
    Subject.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Subject deleted successfully' });
    });
};

module.exports = { getAllSubjects, getSubjectById, updateSubject, deleteSubject };
