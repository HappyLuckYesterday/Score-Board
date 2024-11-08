const db = require('../config/db');

const Score = {
    create: (scoreData, callback) => {
        const { user_id, group_id, score, subject_id, description, create_id, create_time } = scoreData;
        console.log(scoreData);
        db.query(
            'INSERT INTO score (user_id, group_id, score, subject_id, description, create_id, create_time) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [user_id, group_id, score, subject_id, description, create_id, create_time], 
            callback
        );
    },
    getAll: (pageNum, pageSize, callback) => {
        const offset = (pageNum - 1) * pageSize;
        db.query('SELECT * FROM score LIMIT ?, ?', [offset, pageSize], callback);
    },
    getAllDetail: (pageNum, pageSize, callback) => {
        const offset = (pageNum - 1) * pageSize;
        db.query(`  SELECT 
                        uu.nick_name AS user_name,
                        sc.group_id,
                        sc.score,
                        ss.name AS subject_name,
                        sc.description,
                        DATE_FORMAT(sc.create_time, '%Y-%m-%d') AS create_date
                    FROM 
                        score AS sc
                    JOIN 
                        user AS uu ON sc.user_id = uu.user_id 
                    JOIN 
                        subject AS ss ON sc.subject_id = ss.id 
                    WHERE 
                        DATE_FORMAT(sc.create_time, '%Y-%m')="2024-11"
                    ORDER BY
                        group_id, user_name
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
        db.query('SELECT * FROM score WHERE id = ?', [id], callback);
    },
    update: (id, scoreData, callback) => {
        const { user_id, group_id, score, subject_id, description, update_id } = scoreData;
        db.query(
            'UPDATE score SET user_id = ?, group_id = ?, score = ?, subject_id = ?, description = ?, update_id = ?, update_time = current_timestamp() WHERE id = ?', 
            [user_id, group_id, score, subject_id, description, update_id, id], 
            callback
        );
    },
    delete: (id, callback) => {
        db.query('DELETE FROM score WHERE id = ?', [id], callback);
    }
};

module.exports = Score;
