import { userSessionService } from './UserSessionService';
import { IUser } from '../types/user.type';
import { ISubject } from '../types/subject.type';
import { b } from 'vitest/dist/reporters-5f784f42';


const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  throw new Error('API_URL is not defined');
}

// curl -X 'POST' \
//   'http://localhost:5295/subjects' \
//   -H 'accept: */*' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "subjectId": "string",
//   "phoneNumber": "string",
//   "onsetTime": "2025-02-19T18:53:19.474Z",
//   "lastSeenNormalTime": "2025-02-19T18:53:19.474Z",
//   "firstName": "string",
//   "lastName": "string",
//   "createdDate": "2025-02-19T18:53:19.474Z",
//   "modifiedDate": "2025-02-19T18:53:19.474Z",
//   "createdBy": "string",
//   "modifiedBy": "string",
//   "stateCode": 0
// }'

function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const apiSubjectDataService = {
  postData: async (data: ISubject) => {
    const user = userSessionService.getSession();
    if (!user) {
      window.location.href = '/login';
      throw new Error('Please login to continue');
    }
    let requestGuid = generateGUID();
    // create token encript from user.uid + user.email
    let token = btoa(user.uid +':'+ user.email); 
    const response = await fetch(`${API_URL}/subjects`, {
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
  getData: async (subjectId: string) => {
    const user = userSessionService.getSession();
    if (!user) {
      window.location.href = '/login';
      throw new Error('Please login to continue');
    }
    let requestGuid = generateGUID();
    let token = btoa(user.uid + ':' + user.email);
    const response = await fetch(`${API_URL}/subjects/${subjectId}`, {
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

    return response.json();
  },
  getList: async () => {
    const user = userSessionService.getSession();
    if (!user) {
      window.location.href = '/login';
      throw new Error('Please login to continue');
    }
    let requestGuid = generateGUID();
    let token = btoa(user.uid + ':' + user.email);
    const response = await fetch(`${API_URL}/subjects`, {
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

    return response.json();
  },
};
