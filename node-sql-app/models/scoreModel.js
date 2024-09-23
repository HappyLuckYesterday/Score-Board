const db = require('../config/db');

const Score = {
    create: (scoreData, callback) => {
        const { user_id, group_id, score, create_id } = scoreData;
        db.query('INSERT INTO score (user_id, group_id, score, create_id) VALUES (?, ?, ?, ?)', 
            [user_id, group_id, score, create_id], callback);
    },
    getAll: (pageNum, pageSize, callback) => {
        const offset = (pageNum - 1) * pageSize;
        db.query('SELECT * FROM score LIMIT ?, ?', [offset, pageSize], callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM score WHERE id = ?', [id], callback);
    },
    update: (id, scoreData, callback) => {
        const { user_id, group_id, score, update_id } = scoreData;
        db.query('UPDATE score SET user_id = ?, group_id = ?, score = ?, update_id = ? WHERE id = ?', 
            [user_id, group_id, score, update_id, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM score WHERE id = ?', [id], callback);
    }
};

module.exports = Score;
