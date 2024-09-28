import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
import api from '../utils/api';

interface DataPoint {
    user_name: string;
    date: string;
    workTime: number;
}

const sample_data: DataPoint[] = [
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
const sampleusers = ['John', 'Adam', 'Eve', 'Mike']; // Dynamic list of user names

const WorkTimeChart: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [data, setData] = useState<DataPoint[]>([]);
    const [users, setUsers] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('2024-09-23'); // Default date
    const [weekStartDate, setWeekStartDate] = useState<string>('2024-09-23'); // Default week start date
    const [selectedGraph, setSelectedGraph] = useState<string>('workTimeChart'); // Default graph

    const filteredData = data.filter((item) => item.user_name === selectedUser);

    useEffect(() => {
        api.get('worktimes/detail/detail').then((response) => {
            setData(response.data);
            const uniqueUserNames: string[] = Array.from(new Set(response.data.map((item: { user_name: string }) => item.user_name)));
            setUsers(uniqueUserNames);
            setSelectedUser(uniqueUserNames[0]);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const getBarColor = (workTime: number) => {
        return workTime < 15 ? '#FF6347' : '#32CD32';
    };

    // Calculate scores for all users based on selected date
    const getScoresByDate = (date: string) => {
        return data
            .filter(item => item.date === date)
            .reduce((acc, item) => {
                acc[item.user_name] = (acc[item.user_name] || 0) + item.workTime;
                return acc;
            }, {} as Record<string, number>);
    };

    // Calculate scores for the week based on selected week start date
    const getScoresByWeek = (startDate: string) => {
        const start = new Date(startDate);
        const end = new Date(start);
        end.setDate(start.getDate() + 6); // End date is 6 days after start

        return data
            .filter(item => {
                const itemDate = new Date(item.date);
                return itemDate >= start && itemDate <= end;
            })
            .reduce((acc, item) => {
                acc[item.user_name] = (acc[item.user_name] || 0) + item.workTime;
                return acc;
            }, {} as Record<string, number>);
    };

    // Get scores for the selected date and week
    const scoresByDate = getScoresByDate(selectedDate);
    const scoresByWeek = getScoresByWeek(weekStartDate);

    // Format data for the horizontal bar chart
    const horizontalChartData = Object.entries(scoresByDate).map(([user_name, workTime]) => ({
        user_name,
        workTime,
    }));

    const weeklyChartData = Object.entries(scoresByWeek).map(([user_name, workTime]) => ({
        user_name,
        workTime,
    }));

    return (
        <div>
            {/* Select Graph Type */}
            <FormControl fullWidth variant="outlined" style={{ marginTop: '20px' }}>
                <InputLabel id="graph-select-label">Select Graph</InputLabel>
                <Select
                    labelId="graph-select-label"
                    value={selectedGraph}
                    onChange={(e) => setSelectedGraph(e.target.value)}
                    label="Select Graph"
                >
                    <MenuItem value="workTimeChart">Work Time Chart</MenuItem>
                    <MenuItem value="dateChart">Work Time for Selected Date</MenuItem>
                    <MenuItem value="weekChart">Weekly Work Times</MenuItem>
                </Select>
            </FormControl>

            {/* Render Selected Graph */}
            {selectedGraph === 'workTimeChart' && (
                <>
                    <FormControl fullWidth variant="outlined" style={{ marginTop: '20px' }}>
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
                            <XAxis dataKey="date" domain={[0, 20]} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="workTime" fill="#8884d8">
                                {filteredData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getBarColor(entry.workTime)} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </>
            )}

            {selectedGraph === 'dateChart' && (
                <>
                    {/* Date Selector for Scores */}
                    <FormControl fullWidth variant="outlined" style={{ marginTop: '20px' }}>
                        <TextField
                            label="Select Date"
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>

                    {/* Horizontal Bar Chart for Selected Date */}
                    <h3>Work Time for {selectedDate}</h3>
                    <ResponsiveContainer width="100%" height={600}>
                        <BarChart data={horizontalChartData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
                            <XAxis type="number" domain={[0, 20]} />
                            <YAxis type="category" dataKey="user_name" />
                            <Tooltip />
                            <Bar dataKey="workTime" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </>
            )}

            {selectedGraph === 'weekChart' && (
                <>
                    {/* Week Selector for Weekly Scores */}
                    <FormControl fullWidth variant="outlined" style={{ marginTop: '20px' }}>
                        <TextField
                            label="Select Week Start Date"
                            type="date"
                            value={weekStartDate}
                            onChange={(e) => setWeekStartDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>

                    {/* Horizontal Bar Chart for Selected Week */}
                    <h3>Weekly Work Times from {weekStartDate} to {new Date(new Date(weekStartDate).setDate(new Date(weekStartDate).getDate() + 6)).toISOString().split('T')[0]}</h3>
                    <ResponsiveContainer width="100%" height={600}>
                        <BarChart data={weeklyChartData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
                            <XAxis type="number" domain={[0, 20]} />
                            <YAxis type="category" dataKey="user_name" />
                            <Tooltip />
                            <Bar dataKey="workTime" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </>
            )}
        </div>
    );
};

export default WorkTimeChart;