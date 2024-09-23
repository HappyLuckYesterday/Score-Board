import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import UserRolePage from './pages/UserRolePage';
import ScoreboardPage from './pages/ScoreboardPage';
import UserTablePage from './pages/UserTablePage';
import ScoreTablePage from './pages/ScoreTablePage';
import GroupTablePage from './pages/GroupTablePage';
import SubjectTablePage from './pages/SubjectTablePage';
import SubscribeTablePage from './pages/SubscribeTablePage';
import Topbar from './layout/Topbar';
import Sidebar from './layout/Sidebar';
import { useAuth } from './components/AuthContext';

const App: React.FC = () => {

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flexGrow: 1 }}>
          <Topbar />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/user-role" element={<UserRolePage />} />
            <Route path="/scoreboard" element={<ScoreboardPage />} />
            <Route path="/user-table" element={<UserTablePage />} />
            <Route path="/score-table" element={<ScoreTablePage />} />
            <Route path="/group-table" element={<GroupTablePage />} />
            <Route path="/subject-table" element={<SubjectTablePage />} />
            <Route path="/subscribe-table" element={<SubscribeTablePage />} />
          </Routes>
        </div>
      </div>
  </Router>
  )

}

export default App;