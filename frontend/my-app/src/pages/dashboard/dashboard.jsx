import React,{useState} from 'react';
import EmpDash from '../../components/dash/empDash';
import ManagerDash from '../../components/dash/managerDash';

function Dashboard() {
    const [userRole, setUserRole] = useState('manager'); 
    return ( 
        <div id="dash-content">
            {
                userRole === 'manager' ? <ManagerDash /> : <EmpDash />
            }
        </div>
     );
}

export default Dashboard;