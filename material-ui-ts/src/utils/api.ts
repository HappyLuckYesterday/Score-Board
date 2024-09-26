import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.86.113.182:5000/board/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
