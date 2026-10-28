const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTasksFromApi = async () => {
    try{
        const response = await fetch(`${API_URL}?_limit=3`);
        if(!response.ok)throw new Error("Failed to fetch tasks from server");
        const data = await response.json();

        return data.map(item => ({
            id: item.id + 100,
            title: item.title,
            //description: "Imported from global server API",
            status: item.completed ? "Completed" : "Pending",
           //priority: "Medium",
            assignee: "Saad Manzoor"
        }));
    }
    catch (error){
        throw error;
    }
};