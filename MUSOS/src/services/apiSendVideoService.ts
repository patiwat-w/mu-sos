import { userSessionService } from './UserSessionService';
import { IUser } from '../types/user.type';

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
export const apiSendVideoService = {

  
  
  // return response
  postData: async (blob: any) => {

    const user = userSessionService.getSession();
    if (!user) {
      //throw new Error('No active user session');
      // go to login page
      window.location.href = '/login';
      throw new Error('Please login to continue');

    }
   //alert(JSON.stringify(user));
    // get guid
    let requestGuid  = generateGUID();
    let user_id = user.localUserMappingId;
    // send form data binary
    const formData = new FormData();
   
    formData.append('video', blob, 'video.webm');
    const response = await fetch(`${API_URL}/submit_video?user_id=${user_id}`, {
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
  postDataWithMetadata: async (blob: any, metadata: any) => {
    const user = userSessionService.getSession();
    if (!user) {
      window.location.href = '/login';
      throw new Error('Please login to continue');
    }

    let requestGuid = generateGUID();
    let user_id = user.localUserMappingId;
    const formData = new FormData();
    formData.append('video', blob, 'video.webm');
    formData.append('metadata', JSON.stringify(metadata));

    const response = await fetch(`${API_URL}/submit_video_with_metadata?user_id=${user_id}`, {
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
  }
};
