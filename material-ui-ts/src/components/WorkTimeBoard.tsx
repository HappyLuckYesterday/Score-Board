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
import { getTodayDate } from '../utils/common';

interface DataPoint {
    user_name: string;
    group_id: number;
    date: string;
    workTime: number;
}

const WorkTimeChart: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState<string>('');
    const [data, setData] = useState<DataPoint[]>([]);
    const [users, setUsers] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>(getTodayDate()); // Default date
    const [weekStartDate, setWeekStartDate] = useState<string>(getTodayDate()); // Default week start date
    const [selectedGraph, setSelectedGraph] = useState<string>('userChart'); // Default graph

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
        if (workTime < 15) return '#FF4C4C';
        if (workTime > 15) return '#00BFFF';
        return '#3CB371'
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

    // Calculate total scores sum up
    const getTotalScores = () => {
        return data.reduce((acc, item) => {
            acc[item.user_name] = (acc[item.user_name] || 0) + item.workTime;
                return acc;
        }, {} as Record<string, number>);
    }

    // Calculate total scores by team
    const getTeamScores = () => {
        return data.reduce((acc, item) => {
            acc[item.group_id] = (acc[item.group_id] || 0) + item.workTime;
                return acc;
        }, {} as Record<string, number>);
    }

    const filteredData = data.filter((item) => item.user_name === selectedUser);

    // Get scores for the selected date and week
    const scoresByDate = getScoresByDate(selectedDate);
    const scoresByWeek = getScoresByWeek(weekStartDate);
    const scoresTotal = getTotalScores();
    const scoresByTeam = getTeamScores();

    // Format data for the horizontal bar chart
    const horizontalChartData = Object.entries(scoresByDate).map(([user_name, workTime]) => ({
        user_name,
        workTime,
    }));

    const weeklyChartData = Object.entries(scoresByWeek).map(([user_name, workTime]) => ({
        user_name,
        workTime,
    }));

    const totalChartData = Object.entries(scoresTotal).map(([user_name, workTime]) => ({
        user_name,
        workTime,
    }));

    const teamChartData = Object.entries(scoresByTeam).map(([group_id, workTime]) => ({
        group_id,
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
                    <MenuItem value="userChart">By Users</MenuItem>
                    <MenuItem value="dateChart">By Date</MenuItem>
                    <MenuItem value="weekChart">By Week</MenuItem>
                    <MenuItem value="teamChart">By Team</MenuItem>
                    <MenuItem value="totalChart">All</MenuItem>
                </Select>
            </FormControl>

            {/* Render Selected Graph */}
            {selectedGraph === 'userChart' && (
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
                            <Bar dataKey="workTime" fill="#8884d8">
                                {horizontalChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getBarColor(entry.workTime)} />
                                ))}
                            </Bar>
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

            {selectedGraph === 'totalChart' && (
                <>
                    {/* Horizontal Bar Chart for Selected Date */}
                    {/* <h3>Work Time for {selectedDate}</h3> */}
                    <ResponsiveContainer width="100%" height={600}>
                        <BarChart data={totalChartData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="user_name" />
                            <Tooltip />
                            <Bar dataKey="workTime" fill="#8884d8">
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </>
            )}

            {selectedGraph === 'teamChart' && (
                <>
                    {/* Horizontal Bar Chart for Selected Date */}
                    {/* <h3>Work Time for {selectedDate}</h3> */}
                    <ResponsiveContainer width="100%" height={600}>
                        <BarChart data={teamChartData} margin={{ top: 70, right: 30, left: 20, bottom: 25 }}>
                            <XAxis dataKey="group_id" domain={[0, 20]} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="workTime" fill="#8884d8">
                                {teamChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getBarColor(entry.workTime)} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </>
            )}
        </div>
    );
};

export default WorkTimeChart;