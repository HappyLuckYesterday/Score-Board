const express = require('express');
const { getAllSubscribes, getSubscribeById, updateSubscribe, deleteSubscribe } = require('../controllers/subscribeController');
const router = express.Router();

router.get('/', getAllSubscribes);
router.get('/:id', getSubscribeById);
router.put('/:id', updateSubscribe);
router.delete('/:id', deleteSubscribe);

module.exports = router;
