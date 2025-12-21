import taskService from '../../services/task';

export const loadTasks = async (role, setTasks, setLoading) => {
    try {
        const response = await taskService.getTasks(role);
        setTasks(response.tasks || []);
    } catch (error) {
        console.error("Failed to load tasks", error);
    } finally {
        if (setLoading) setLoading(false);
    }
};
