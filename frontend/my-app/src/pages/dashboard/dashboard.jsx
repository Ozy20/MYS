import { Navigate, useOutletContext } from 'react-router-dom';
import ManagerDash from "../../components/dash/managerDash"
function Dashboard() {
    const { userRole } = useOutletContext();

    return (
        <div id="dash-content">

            {
                userRole === 'manager' ? <ManagerDash /> : <Navigate to="/app/tasks" replace />
            }
        </div>
    );
}

export default Dashboard;