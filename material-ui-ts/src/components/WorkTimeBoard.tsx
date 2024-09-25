import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from 'recharts';

interface DataPoint {
    user_name: string;
    date: string;
    workTime: number;
}

const data: DataPoint[] = [
    { "user_name": "John", "date": "2024-09-01", "workTime": 15 },
    { "user_name": "John", "date": "2024-09-02", "workTime": 14 },
    { "user_name": "John", "date": "2024-09-03", "workTime": 16 },
    { "user_name": "John", "date": "2024-09-04", "workTime": 18 },
    { "user_name": "John", "date": "2024-09-05", "workTime": 13 },
    { "user_name": "John", "date": "2024-09-06", "workTime": 17 },
    { "user_name": "John", "date": "2024-09-07", "workTime": 15 },
    { "user_name": "John", "date": "2024-09-08", "workTime": 14 },
    { "user_name": "John", "date": "2024-09-09", "workTime": 16 },
    { "user_name": "John", "date": "2024-09-10", "workTime": 17 },
    { "user_name": "John", "date": "2024-09-11", "workTime": 18 },
    { "user_name": "John", "date": "2024-09-12", "workTime": 15 },
    { "user_name": "John", "date": "2024-09-13", "workTime": 14 },
    { "user_name": "John", "date": "2024-09-14", "workTime": 13 },
    { "user_name": "John", "date": "2024-09-15", "workTime": 16 },
    { "user_name": "John", "date": "2024-09-16", "workTime": 17 },
    { "user_name": "John", "date": "2024-09-17", "workTime": 15 },
    { "user_name": "John", "date": "2024-09-18", "workTime": 14 },
    { "user_name": "John", "date": "2024-09-19", "workTime": 18 },
    { "user_name": "John", "date": "2024-09-20", "workTime": 16 },
    { "user_name": "John", "date": "2024-09-21", "workTime": 15 },
    { "user_name": "John", "date": "2024-09-22", "workTime": 14 },
    { "user_name": "John", "date": "2024-09-23", "workTime": 17 },
    { "user_name": "John", "date": "2024-09-24", "workTime": 16 },
    { "user_name": "John", "date": "2024-09-25", "workTime": 15 },
    { "user_name": "John", "date": "2024-09-26", "workTime": 14 },
    { "user_name": "John", "date": "2024-09-27", "workTime": 18 },
    { "user_name": "John", "date": "2024-09-28", "workTime": 17 },
    { "user_name": "John", "date": "2024-09-29", "workTime": 15 },
    { "user_name": "John", "date": "2024-09-30", "workTime": 14 },

    { "user_name": "Adam", "date": "2024-09-01", "workTime": 14 },
    { "user_name": "Adam", "date": "2024-09-02", "workTime": 15 },
    { "user_name": "Adam", "date": "2024-09-03", "workTime": 16 },
    { "user_name": "Adam", "date": "2024-09-04", "workTime": 13 },
    { "user_name": "Adam", "date": "2024-09-05", "workTime": 17 },
    { "user_name": "Adam", "date": "2024-09-06", "workTime": 18 },
    { "user_name": "Adam", "date": "2024-09-07", "workTime": 15 },
    { "user_name": "Adam", "date": "2024-09-08", "workTime": 14 },
    { "user_name": "Adam", "date": "2024-09-09", "workTime": 16 },
    { "user_name": "Adam", "date": "2024-09-10", "workTime": 18 },
    { "user_name": "Adam", "date": "2024-09-11", "workTime": 15 },
    { "user_name": "Adam", "date": "2024-09-12", "workTime": 14 },
    { "user_name": "Adam", "date": "2024-09-13", "workTime": 16 },
    { "user_name": "Adam", "date": "2024-09-14", "workTime": 17 },
    { "user_name": "Adam", "date": "2024-09-15", "workTime": 13 },
    { "user_name": "Adam", "date": "2024-09-16", "workTime": 15 },
    { "user_name": "Adam", "date": "2024-09-17", "workTime": 14 },
    { "user_name": "Adam", "date": "2024-09-18", "workTime": 16 },
    { "user_name": "Adam", "date": "2024-09-19", "workTime": 17 },
    { "user_name": "Adam", "date": "2024-09-20", "workTime": 18 },
    { "user_name": "Adam", "date": "2024-09-21", "workTime": 15 },
    { "user_name": "Adam", "date": "2024-09-22", "workTime": 14 },
    { "user_name": "Adam", "date": "2024-09-23", "workTime": 16 },
    { "user_name": "Adam", "date": "2024-09-24", "workTime": 17 },
    { "user_name": "Adam", "date": "2024-09-25", "workTime": 15 },
    { "user_name": "Adam", "date": "2024-09-26", "workTime": 14 },
    { "user_name": "Adam", "date": "2024-09-27", "workTime": 16 },
    { "user_name": "Adam", "date": "2024-09-28", "workTime": 17 },
    { "user_name": "Adam", "date": "2024-09-29", "workTime": 15 },
    { "user_name": "Adam", "date": "2024-09-30", "workTime": 14 },

    { "user_name": "Eve", "date": "2024-09-01", "workTime": 13 },
    { "user_name": "Eve", "date": "2024-09-02", "workTime": 15 },
    { "user_name": "Eve", "date": "2024-09-03", "workTime": 17 },
    { "user_name": "Eve", "date": "2024-09-04", "workTime": 14 },
    { "user_name": "Eve", "date": "2024-09-05", "workTime": 16 },
    { "user_name": "Eve", "date": "2024-09-06", "workTime": 18 },
    { "user_name": "Eve", "date": "2024-09-07", "workTime": 15 },
    { "user_name": "Eve", "date": "2024-09-08", "workTime": 14 },
    { "user_name": "Eve", "date": "2024-09-09", "workTime": 13 },
    { "user_name": "Eve", "date": "2024-09-10", "workTime": 15 },
    { "user_name": "Eve", "date": "2024-09-11", "workTime": 16 },
    { "user_name": "Eve", "date": "2024-09-12", "workTime": 18 },
    { "user_name": "Eve", "date": "2024-09-13", "workTime": 17 },
    { "user_name": "Eve", "date": "2024-09-14", "workTime": 14 },
    { "user_name": "Eve", "date": "2024-09-15", "workTime": 15 },
    { "user_name": "Eve", "date": "2024-09-16", "workTime": 16 },
    { "user_name": "Eve", "date": "2024-09-17", "workTime": 18 },
    { "user_name": "Eve", "date": "2024-09-18", "workTime": 15 },
    { "user_name": "Eve", "date": "2024-09-19", "workTime": 14 },
    { "user_name": "Eve", "date": "2024-09-20", "workTime": 13 },
    { "user_name": "Eve", "date": "2024-09-21", "workTime": 15 },
    { "user_name": "Eve", "date": "2024-09-22", "workTime": 16 },
    { "user_name": "Eve", "date": "2024-09-23", "workTime": 18 },
    { "user_name": "Eve", "date": "2024-09-24", "workTime": 17 },
    { "user_name": "Eve", "date": "2024-09-25", "workTime": 15 },
    { "user_name": "Eve", "date": "2024-09-26", "workTime": 14 },
    { "user_name": "Eve", "date": "2024-09-27", "workTime": 16 },
    { "user_name": "Eve", "date": "2024-09-28", "workTime": 17 },
    { "user_name": "Eve", "date": "2024-09-29", "workTime": 15 },
    { "user_name": "Eve", "date": "2024-09-30", "workTime": 14 },

    { "user_name": "Mike", "date": "2024-09-01", "workTime": 16 },
    { "user_name": "Mike", "date": "2024-09-02", "workTime": 14 },
    { "user_name": "Mike", "date": "2024-09-03", "workTime": 15 },
    { "user_name": "Mike", "date": "2024-09-04", "workTime": 17 },
    { "user_name": "Mike", "date": "2024-09-05", "workTime": 18 },
    { "user_name": "Mike", "date": "2024-09-06", "workTime": 13 },
    { "user_name": "Mike", "date": "2024-09-07", "workTime": 15 },
    { "user_name": "Mike", "date": "2024-09-08", "workTime": 14 },
    { "user_name": "Mike", "date": "2024-09-09", "workTime": 16 },
    { "user_name": "Mike", "date": "2024-09-10", "workTime": 17 },
    { "user_name": "Mike", "date": "2024-09-11", "workTime": 15 },
    { "user_name": "Mike", "date": "2024-09-12", "workTime": 14 },
    { "user_name": "Mike", "date": "2024-09-13", "workTime": 18 },
    { "user_name": "Mike", "date": "2024-09-14", "workTime": 16 },
    { "user_name": "Mike", "date": "2024-09-15", "workTime": 15 },
    { "user_name": "Mike", "date": "2024-09-16", "workTime": 14 },
    { "user_name": "Mike", "date": "2024-09-17", "workTime": 13 },
    { "user_name": "Mike", "date": "2024-09-18", "workTime": 18 },
    { "user_name": "Mike", "date": "2024-09-19", "workTime": 17 },
    { "user_name": "Mike", "date": "2024-09-20", "workTime": 16 },
    { "user_name": "Mike", "date": "2024-09-21", "workTime": 15 },
    { "user_name": "Mike", "date": "2024-09-22", "workTime": 14 },
    { "user_name": "Mike", "date": "2024-09-23", "workTime": 13 },
    { "user_name": "Mike", "date": "2024-09-24", "workTime": 15 },
    { "user_name": "Mike", "date": "2024-09-25", "workTime": 16 },
    { "user_name": "Mike", "date": "2024-09-26", "workTime": 18 },
    { "user_name": "Mike", "date": "2024-09-27", "workTime": 14 },
    { "user_name": "Mike", "date": "2024-09-28", "workTime": 17 },
    { "user_name": "Mike", "date": "2024-09-29", "workTime": 15 },
    { "user_name": "Mike", "date": "2024-09-30", "workTime": 16 },

    { "user_name": "Sara", "date": "2024-09-01", "workTime": 17 },
    { "user_name": "Sara", "date": "2024-09-02", "workTime": 15 },
    { "user_name": "Sara", "date": "2024-09-03", "workTime": 14 },
    { "user_name": "Sara", "date": "2024-09-04", "workTime": 16 },
    { "user_name": "Sara", "date": "2024-09-05", "workTime": 18 },
    { "user_name": "Sara", "date": "2024-09-06", "workTime": 13 },
    { "user_name": "Sara", "date": "2024-09-07", "workTime": 15 },
    { "user_name": "Sara", "date": "2024-09-08", "workTime": 14 },
    { "user_name": "Sara", "date": "2024-09-09", "workTime": 16 },
    { "user_name": "Sara", "date": "2024-09-10", "workTime": 17 },
    { "user_name": "Sara", "date": "2024-09-11", "workTime": 18 },
    { "user_name": "Sara", "date": "2024-09-12", "workTime": 15 },
    { "user_name": "Sara", "date": "2024-09-13", "workTime": 14 },
    { "user_name": "Sara", "date": "2024-09-14", "workTime": 13 },
    { "user_name": "Sara", "date": "2024-09-15", "workTime": 15 },
    { "user_name": "Sara", "date": "2024-09-16", "workTime": 16 },
    { "user_name": "Sara", "date": "2024-09-17", "workTime": 18 },
    { "user_name": "Sara", "date": "2024-09-18", "workTime": 15 },
    { "user_name": "Sara", "date": "2024-09-19", "workTime": 14 },
    { "user_name": "Sara", "date": "2024-09-20", "workTime": 13 },
    { "user_name": "Sara", "date": "2024-09-21", "workTime": 15 },
    { "user_name": "Sara", "date": "2024-09-22", "workTime": 16 },
    { "user_name": "Sara", "date": "2024-09-23", "workTime": 18 },
    { "user_name": "Sara", "date": "2024-09-24", "workTime": 17 },
    { "user_name": "Sara", "date": "2024-09-25", "workTime": 15 },
    { "user_name": "Sara", "date": "2024-09-26", "workTime": 14 },
    { "user_name": "Sara", "date": "2024-09-27", "workTime": 13 },
    { "user_name": "Sara", "date": "2024-09-28", "workTime": 16 },
    { "user_name": "Sara", "date": "2024-09-29", "workTime": 18 },
    { "user_name": "Sara", "date": "2024-09-30", "workTime": 15 },

]
const users = ['John', 'Adam', 'Eve', 'Mike']; // Dynamic list of user names

const WorkTimeChart: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<string>('John');

    const filteredData = data.filter((item) => item.user_name === selectedUser);

    const getBarColor = (workTime: number) => {
        return workTime < 15 ? '#FF6347' : '#32CD32';
    };

    return (
        <div>
            <h2>{selectedUser}'s Work Time Chart</h2>
            <FormControl fullWidth variant="outlined">
                <InputLabel id="user-select-label">Select User</InputLabel>
                <Select
                    labelId="user-select-label"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    label="Select User"
                >
                    {users.map((user) => (
                        <MenuItem key={user} value={user}>
                            {user}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <ResponsiveContainer width="100%" height={600}>
                <BarChart data={filteredData} margin={{ top: 70, right: 30, left: 20, bottom: 25 }}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="workTime" fill="#8884d8">
                        {filteredData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={getBarColor(entry.workTime)}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WorkTimeChart;