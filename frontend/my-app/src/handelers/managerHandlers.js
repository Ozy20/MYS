import employeeService from '../../services/employee';
import taskService from '../../services/task';

export const handelEmpForm = (e, empForm, setEmpForm) => {
    setEmpForm({
        ...empForm,
        [e.target.name]: e.target.value
    });
};

export const handelTaskForm = (e, task, setTask) => {
    setTask({
        ...task,
        [e.target.name]: e.target.value
    });
};

export const handelAddEmp = async (empForm) => {
    try {
        const response = await employeeService.addEmployee(empForm);
        console.log(response);
        alert("Employee added successfully");
    }
    catch (error) {
        console.error("Error adding employee:", error);
        alert(error);
    }
};

export const handelAssignTask = async (task) => {
    try {
        const response = await taskService.assignTask(task);
        console.log(response);
        alert("Task assigned successfully");
    }
    catch (error) {
        console.error("Error assigning task:", error);
        alert(error);
    }
};
