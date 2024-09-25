const User = require('../models/userModel');

const getAllUsers = (req, res) => {
  const { pageNum = 1, pageSize = 10 } = req.query;
  User.getAll(pageNum, pageSize, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.getById(id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: 'User not found' });
      res.json(results[0]);
  });
};

const createUser = (req, res) => {
  const { name, nick_name, email, password, group_id, role } = req.body;
  User.create({ name, nick_name, email, password, group_id, role }, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'User created successfully', id: results.insertId });
  });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, nick_name, email, password, group_id, role } = req.body;
  User.update(id, { name, nick_name, email, password, group_id, role }, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'User updated successfully' });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  User.delete(id, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'User deleted successfully' });
  });
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
