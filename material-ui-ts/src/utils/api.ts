import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8088/board/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
