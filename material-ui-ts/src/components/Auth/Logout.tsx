import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    logout();
    navigate('/login');
    return null;
}

export default Logout;