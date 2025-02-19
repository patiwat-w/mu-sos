import { userSessionService } from './UserSessionService';
import { IUser } from '../types/user.type';

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  throw new Error('API_URL is not defined');
}
// Ensure that API_URL is correctly set in your environment variables
// For example, in your .env file:
// VITE_API_URL=http://your-api-url.com

function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const apiSubjectDataService = {
  postData: async (data: any) => {
    const user = userSessionService.getSession();
    if (!user) {
      window.location.href = '/login';
      throw new Error('Please login to continue');
    }
    let requestGuid = generateGUID();
    const formData = new FormData();
    formData.append('name', 'patiwat');
    formData.append('email', 'patiwat.pfc@gmail.com');
    formData.append('age', '12');
    formData.append('gender', 'male');
    formData.append('notes', 'tese');

    const response = await fetch(`${API_URL}/submit_data`, {
      method: 'POST',
      body: formData,
      headers: {
        'X-Request-ID': requestGuid,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  },
};
