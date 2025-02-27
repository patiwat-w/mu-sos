import { userSessionService } from './UserSessionService';
import { ISubjectHealthInfo } from '../types/subjectHealthInfo.type';

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  throw new Error('API_URL is not defined');
}

function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const apiSubjectHealthInfoService = {
  postData: async (data: ISubjectHealthInfo) => {
    let requestGuid = generateGUID();
    let token = userSessionService.getToken();
    const response = await fetch(`${API_URL}/subjecthealthinfo`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'X-Request-ID': requestGuid,
        'Authorization': `Bearer ${token}`, // Add authentication token to the headers
      },
    });

    if (!response.ok) {
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

    return response;
  },
  getData: async (id: string) => {
    let requestGuid = generateGUID();
    let token = userSessionService.getToken();
    const response = await fetch(`${API_URL}/subjecthealthinfo/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-ID': requestGuid,
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
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

    return response;
  },
  getList: async () => {
    let requestGuid = generateGUID();
    let token = userSessionService.getToken();
    const response = await fetch(`${API_URL}/subjecthealthinfo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-ID': requestGuid,
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
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

    return response;
  },
  updateData: async (id: string, data: ISubjectHealthInfo) => {
    let requestGuid = generateGUID();
    let token = userSessionService.getToken();
    const response = await fetch(`${API_URL}/subjecthealthinfo/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'X-Request-ID': requestGuid,
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
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

    return response;
  },
  deleteData: async (id: string) => {
    let requestGuid = generateGUID();
    let token = userSessionService.getToken();
    const response = await fetch(`${API_URL}/subjecthealthinfo/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Request-ID': requestGuid,
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
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

    return response;
  },
};