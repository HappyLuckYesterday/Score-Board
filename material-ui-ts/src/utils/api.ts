import axios from 'axios';

const api = axios.create({
    baseURL: 'http://100.99.99.7:5000/board/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
