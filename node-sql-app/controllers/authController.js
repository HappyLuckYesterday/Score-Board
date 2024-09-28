const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const signup = async (req, res) => {
    const { name, nick_name, email, password, group_id } = req.body;
    const user_id = uuidv4();
    const role = 'user';
    const hashedPassword = await bcrypt.hash(password, 10);
    const match = await bcrypt.compare(password, hashedPassword);
    console.log("signup", user_id, name, nick_name, email, password, hashedPassword, group_id, role);
    User.create({ user_id, name, nick_name, email, password: hashedPassword, group_id: 1, role: role }, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId, email });
    });
};

const login = (req, res) => {
    const { email, password } = req.body;
    User.getByEmail(email, async (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ message: 'User not found' });
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (match && user.active_flag === 'Y') {
            const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            console.log("login", user.id, user.email, user.role, token);
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials: password is incorrect' });
        }
    });
};

module.exports = { signup, login };
