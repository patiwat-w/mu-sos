import { userSessionService } from './UserSessionService';
import { IUser } from '../types/user.type';
const API_URL = "https://msu-triage.egmu-research.org/service/proxy.ashx?http://192.168.10.3:5000";
function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
export const apiSubjectDataService = {

  
  
  // return response
  postData: async (data: any) => {

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
    //let user_id = user.localUserMappingId;
    // send form data binary
    const formData = new FormData();
    // Add personal information
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
