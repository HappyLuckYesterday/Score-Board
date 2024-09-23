const db = require('../config/db');

const Group = {
    create: (groupData, callback) => {
        const { name } = groupData;
        db.query('INSERT INTO `group` (name) VALUES (?)', [name], callback);
    },
    getAll: (pageNum, pageSize, callback) => {
        const offset = (pageNum - 1) * pageSize;
        db.query('SELECT * FROM `group` LIMIT ?, ?', [offset, pageSize], callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM `group` WHERE id = ?', [id], callback);
    },
    update: (id, groupData, callback) => {
        const { name } = groupData;
        db.query('UPDATE `group` SET name = ? WHERE id = ?', [name, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM `group` WHERE id = ?', [id], callback);
    }
};

module.exports = Group;
