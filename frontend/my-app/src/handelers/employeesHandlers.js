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

export const handleEdit = (employee) => {
    // Placeholder for edit functionality
    console.log("Edit employee:", employee);
};
