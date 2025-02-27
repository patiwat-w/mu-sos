import { IFile } from '../types/file.type';
import { userSessionService } from './UserSessionService';

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

async function makeRequest(url: string, method: string, body?: any, isFormData: boolean = false) {
  const user = userSessionService.getSession();
  if (!user) {
    window.location.href = '/login';
    throw new Error('Please login to continue');
  }
  let requestGuid = generateGUID();
  let token = btoa(user.uid + ':' + user.email);
  const headers: Record<string, string> = {
    'X-Request-ID': requestGuid,
    'Authorization': `Bearer ${token}`,
  };
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  const response = await fetch(url, {
    method,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    headers,
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
}

export const apiFileService = {
  uploadFile: async (file: File, 
    subjectId: number, 
    userId: number, 
    fileCategory: string,
    fileType:string,
    fileName:string,
    fileExtension:string,
    fileInfo?:string ) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('SubjectId', subjectId.toString());
    formData.append('UserId', userId.toString());
    formData.append('FileCategory', fileCategory.toString());
    formData.append('FileType', fileType.toString());
    formData.append('FileName', fileName.toString());
    formData.append('FileExtension', fileExtension.toString());
    if (fileInfo) {
      formData.append('FileInfo', fileInfo.toString());
    }else{
      formData.append('FileInfo', '');
    }
  

    const response = await makeRequest(`${API_URL}/file/upload`, 'POST', formData, true);
    return response;
  },
  getFile: async (fileId: string) => {
    const response = await makeRequest(`${API_URL}/file/info/${fileId}`, 'GET');
    return response.json();
  },
  listFiles: async () => {
    const response = await makeRequest(`${API_URL}/file/list`, 'GET');
    return response.json();
  },
};
