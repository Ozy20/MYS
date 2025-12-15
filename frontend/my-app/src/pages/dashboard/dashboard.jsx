import { Navigate } from 'react-router-dom';
import ManagerDash from "../../components/dash/managerDash"
import { useAuth } from '../../context/AuthContext';

function Dashboard() {
    const { isManager } = useAuth();

    return (
        <div id="dash-content">

            {
                isManager ? <ManagerDash /> : <Navigate to="/app/tasks" replace />
            }
        </div>
    );
}

export default Dashboard;