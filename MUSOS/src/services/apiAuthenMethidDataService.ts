import { UserAuthenticationMethodModel } from '../types/authenMethod.type';
import { userSessionService } from './UserSessionService';


if (!import.meta.env.VITE_API_URL) {
  throw new Error('API_URL is not defined');
}
const API_URL = import.meta.env.VITE_API_URL + '/user-auth-methods';

function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function handleResponseError(response: Response) {
  let errorMessage = '';
  switch (response.status) {
    case 400:
      errorMessage = 'Invalid Input. Please check your input.';
      break;
    case 401:
      errorMessage = 'Unauthorized. Please login again.';
      break;
    case 403:
      errorMessage = 'Forbidden. You do not have permission to perform this action.';
      break;
    case 404:
      errorMessage = 'Not Found. The requested resource could not be found.';
      break;
    case 500:
      errorMessage = 'Internal Server Error. Please try again later.';
      break;
    default:
      errorMessage = `Error: ${response.statusText}`;
  }
  throw new Error(errorMessage);
}

async function fetchWithAuth(url: string, options: RequestInit) {
  const user = userSessionService.getSession();
  if (!user) {
    window.location.href = '/login';
    throw new Error('Please login to continue');
  }
  let requestGuid = generateGUID();
  let token = btoa("system:system");

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-Request-ID': requestGuid,
    'Authorization': `Bearer ${token}`,
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    handleResponseError(response);
  }

  return response.json();
}

export const apiAuthenMethidDataService = {
  getAll: async () => {
    return fetchWithAuth(API_URL, { method: 'GET' });
  },
  get: async (id: string, filters?: { provider?: string; providerKey?: string; email?: string }) => {
    let url = `${API_URL}/${id}`;
    if (filters) {
      const queryParams = new URLSearchParams(filters as any).toString();
      url += `?${queryParams}`;
    }
    return fetchWithAuth(url, { method: 'GET' });
  },
  filters: async (filters?: { provider?: string; providerKey?: string; email?: string }) => {
    let url = `${API_URL}`;
    if (filters) {
      const queryParams = new URLSearchParams(filters as any).toString();
      url += `?${queryParams}`;
    }
    return fetchWithAuth(url, { method: 'GET' });
  },
  create: async (data: UserAuthenticationMethodModel) => {
    return fetchWithAuth(API_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: string, data: UserAuthenticationMethodModel) => {
    return fetchWithAuth(`${API_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (id: string) => {
    return fetchWithAuth(`${API_URL}/${id}`, { method: 'DELETE' });
  },
};
