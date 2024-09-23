const express = require('express');
const { getAllGroups, getGroupById, updateGroup, deleteGroup } = require('../controllers/groupController');
const router = express.Router();

router.get('/', getAllGroups);
router.get('/:id', getGroupById);
router.put('/:id', updateGroup);
router.delete('/:id', deleteGroup);

module.exports = router;
