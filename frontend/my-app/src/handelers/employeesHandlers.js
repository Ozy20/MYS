import employeeService from '../../services/employee';

export const loadEmployees = async (setEmployees, setLoading) => {
    try {
        const response = await employeeService.getAllEmployees();
        setEmployees(response.employees || []);
    } catch (error) {
        console.error("Failed to load employees", error);
    } finally {
        if (setLoading) setLoading(false);
    }
};

export const handleDelete = async (userName, employees, setEmployees) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
        try {
            const response = await employeeService.deleteEmployee(userName);

            if (response.success) {
                alert("Employee deleted successfully");
                setEmployees(employees.filter(emp => emp.userName !== userName));
            }
            else {
                alert(response.message);
            }
        } catch (error) {
            console.error("Failed to delete employee", error);
            alert("Failed to delete employee");
        }
    }
};

export const handleEdit = async (updatedEmployee, employees, setEmployees) => {
    if (!updatedEmployee.name && !updatedEmployee.email && !updatedEmployee.userName) {
        alert("You need to fill at least one field");
        return;
    }

    try {

        const response = await employeeService.updateEmployee(updatedEmployee.id, updatedEmployee);

        if (response.message === "Employee modified successfully") {
            alert("Employee updated successfully");
            setEmployees(employees.map(emp =>
                emp.id === updatedEmployee.id ? updatedEmployee : emp
            ));
        } else {
            alert(response.error || "Failed to update employee");
        }
    } catch (error) {
        console.error("Failed to update employee", error);
        alert("Failed to update employee");
    }
};
