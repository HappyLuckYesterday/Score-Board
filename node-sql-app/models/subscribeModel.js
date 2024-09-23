const db = require('../config/db');

const Subscribe = {
    create: (subscribeData, callback) => {
        const { user_id, subject_id, create_id } = subscribeData;
        db.query('INSERT INTO subscribe (user_id, subject_id, create_id) VALUES (?, ?, ?)', 
            [user_id, subject_id, create_id], callback);
    },
    getAll: (pageNum, pageSize, callback) => {
        const offset = (pageNum - 1) * pageSize;
        db.query('SELECT * FROM subscribe LIMIT ?, ?', [offset, pageSize], callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM subscribe WHERE id = ?', [id], callback);
    },
    update: (id, subscribeData, callback) => {
        const { user_id, subject_id, update_id } = subscribeData;
        db.query('UPDATE subscribe SET user_id = ?, subject_id = ?, update_id = ? WHERE id = ?', 
            [user_id, subject_id, update_id, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM subscribe WHERE id = ?', [id], callback);
    }
};

module.exports = Subscribe;
