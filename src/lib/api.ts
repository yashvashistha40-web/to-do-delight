import axios from 'axios';

// Configure your API base URL here
const API_BASE_URL = 'https://ig0d3yncqe.execute-api.ap-south-1.amazonaws.com/Stage'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
}

export interface CreateTaskPayload {
  title: string;
}

export interface UpdateTaskPayload {
  title?: string;
  completed?: boolean;
}

export const taskApi = {
  // Get all tasks
  getTasks: async (): Promise<Task[]> => {
  const response = await api.get('/tasks');
  // Normalize backend fields to frontend shape
  return response.data.map((item: any) => ({
    id: item.taskId,
    title: item.title,
    completed: item.completed,
    createdAt: item.createdAt,
  }));
},

  // getTasks: async (): Promise<Task[]> => {
  //   const response = await api.get('/tasks');
  //   return response.data;
  // },

  // Create a new task
  createTask: async (payload: CreateTaskPayload): Promise<Task> => {
  const response = await api.post('/tasks', payload);
  return {
    id: response.data.taskId,
    title: payload.title,
    completed: false,
  };
},

  // createTask: async (payload: CreateTaskPayload): Promise<Task> => {
  //   const response = await api.post('/tasks', payload);
  //   return response.data;
  // },

  // Update a task
  updateTask: async (id: string, payload: UpdateTaskPayload): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, payload);
    return response.data;
  },

  // Delete a task
  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};

export default api;
