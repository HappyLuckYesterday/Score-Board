const db = require('../config/db');

const User = {
    create: (userData, callback) => {
        const { user_id, name, nick_name, email, password, group_id, role } = userData;
        db.query('INSERT INTO user (user_id, name, nick_name, email, password, group_id, role) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [user_id, name, nick_name, email, password, group_id, role], callback);
    },
    getAll: (pageNum, pageSize, callback) => {
        const offset = (pageNum - 1) * pageSize;
        db.query('SELECT * FROM user LIMIT ?, ?', [offset, pageSize], callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM user WHERE id = ?', [id], callback);
    },
    getByEmail: (email, callback) => {
        db.query('SELECT * FROM user WHERE email = ?', [email], callback);
    },
    update: (id, userData, callback) => {
        const { name, nick_name, email, password, group_id, role } = userData;
        db.query('UPDATE user SET name = ?, nick_name = ?, email = ?, password = ?, group_id = ?, role = ? WHERE id = ?',
            [name, nick_name, email, password, group_id, role, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM user WHERE id = ?', [id], callback);
    },
};

module.exports = User;
