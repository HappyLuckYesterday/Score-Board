const db = require('../config/db');

const Subject = {
    create: (subjectData, callback) => {
        const { name, description, due_date, score, accept, create_id } = subjectData;
        db.query('INSERT INTO subject (name, description, due_date, score, accept, create_id) VALUES (?, ?, ?, ?, ?, ?)', 
            [name, description, due_date, score, accept, create_id], callback);
    },
    getAll: (pageNum, pageSize, callback) => {
        const offset = (pageNum - 1) * pageSize;
        db.query('SELECT * FROM subject LIMIT ?, ?', [offset, pageSize], callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM subject WHERE id = ?', [id], callback);
    },
    update: (id, subjectData, callback) => {
        const { name, description, due_date, score, accept } = subjectData;
        db.query('UPDATE subject SET name = ?, description = ?, due_date = ?, score = ?, accept = ? WHERE id = ?', 
            [name, description, due_date, score, accept, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM subject WHERE id = ?', [id], callback);
    }
};

module.exports = Subject;
