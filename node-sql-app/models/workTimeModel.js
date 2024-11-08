const db = require('../config/db');

const WorkTime = {
    create: (workTimeData, callback) => {
        const { user_id, date, work_time } = workTimeData;
        db.query(
            'INSERT INTO `worktime` (user_id, date, work_time) VALUES (?, ?, ?)', 
            [user_id, date, work_time], 
            callback
        );
    },
    getAll: (pageNum, pageSize, callback) => {
        const offset = (pageNum - 1) * pageSize;
        db.query('SELECT * FROM `worktime` LIMIT ?, ?', [offset, pageSize], callback);
    },
    getAllDetail: (pageNum, pageSize, callback) => {
        const offset = (pageNum - 1) * pageSize;
        db.query(`  SELECT 
                        uu.name AS user_name,
                        uu.group_id AS group_id,
                        DATE_FORMAT(wt.date, '%Y-%m-%d') AS date,
                        wt.work_time AS workTime
                    FROM 
                        worktime AS wt
                    JOIN 
                        user AS uu ON wt.user_id = uu.user_id
                    WHERE 
                        1=1
                    ORDER BY
                        date, group_id, user_name
                    LIMIT ?, ?`,
                    [offset, pageSize], 
                    (error, results) => {
                        if (error) {
                            return callback(error);
                        }
                        callback(null, results);
                    });
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM `worktime` WHERE id = ?', [id], callback);
    },
    update: (id, workTimeData, callback) => {
        const { user_id, date, work_time } = workTimeData;
        db.query(
            'UPDATE `worktime` SET user_id = ?, date = ?, work_time = ? WHERE id = ?', 
            [user_id, date, work_time, id], 
            callback
        );
    },
    delete: (id, callback) => {
        db.query('DELETE FROM `worktime` WHERE id = ?', [id], callback);
    }
};

module.exports = WorkTime;
