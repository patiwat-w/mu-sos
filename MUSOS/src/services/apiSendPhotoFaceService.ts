import { userSessionService } from './UserSessionService';
import { IUser } from '../types/user.type';
const API_URL = import.meta.env.VITE_AI_SERVICE_URL;
if (!API_URL) {
  throw new Error('API_URL is not defined');
}
//const API_URL = "https://msu-triage.egmu-research.org/service/proxy.ashx?http://192.168.10.3:5000";
function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
export const apiSendPhotoFaceService = {

  
  
  // return response
  postData: async (blob: any) => {

    const user = await userSessionService.getSession();
    if (!user) {
      //throw new Error('No active user session');
      // go to login page
      window.location.href = '/login';
      throw new Error('Please login to continue');

    }
   //alert(JSON.stringify(user));
    // get guid
    let requestGuid  = generateGUID();
    let user_id = user.localUserMappingId || 0;
    // send form data binary
    const formData = new FormData();
    //formData.append('image', data.image);
    formData.append('frame', blob, 'frame.jpg');
    const response = await fetch(`${API_URL}/process_frame?user_id=${user_id}`, {
      method: 'POST',
      body: formData,      
      headers: {
        'X-Request-ID': requestGuid,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const headers = {
      xAspNetVersion: response.headers.get('x-aspnet-version'),
      xEyeDrift: response.headers.get('x-eye-drift'),
      xEyesAligned: response.headers.get('x-eyes-aligned'),
      xFaceSymmetric: response.headers.get('x-face-symmetric'),
      xHeadTilt: response.headers.get('x-head-tilt')
    };

    console.log(headers);

    return { response, headers };
  },
};