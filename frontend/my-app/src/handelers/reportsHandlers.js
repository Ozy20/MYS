import reportService from '../../services/report';

export const loadReports = async (role, setReports, setLoading) => {
    try {
        const response = await reportService.getReports(role);
        setReports(response.reports || []);
    } catch (error) {
        console.error("Failed to load reports", error);
    } finally {
        if (setLoading) setLoading(false);
    }
};
