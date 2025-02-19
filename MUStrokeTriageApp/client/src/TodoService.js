import { ApiClient, TodoApi } from './api';

const apiClient = new ApiClient();
apiClient.basePath = '/api';

const todoApi = new TodoApi(apiClient);

export const fetchTodos = async () => {
  try {
    const todos = await todoApi.apiTodoGet();
    return todos;
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    throw error;
  }
};
