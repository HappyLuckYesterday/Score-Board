const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
const subscribeRoutes = require('./routes/subscribeRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const workTimeRoutes = require('./routes/workTimeRoutes');
const { authenticateJWT } = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Routes
app.use('/board/api/auth', authRoutes);
app.use('/board/api/users', userRoutes);
app.use('/board/api/groups', groupRoutes);
app.use('/board/api/scores', scoreRoutes);
app.use('/board/api/subscribes', authenticateJWT, subscribeRoutes);
app.use('/board/api/subjects', subjectRoutes);
app.use('/board/api/worktimes', workTimeRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
