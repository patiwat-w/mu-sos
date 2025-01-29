const API_URL = "https://192.168.10.3:5000";
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
    // get guid
    let requestGuid  = generateGUID();
    // send form data binary
    const formData = new FormData();
    //formData.append('image', data.image);
    formData.append('frame', blob, 'frame.jpg');
    const response = await fetch(`${API_URL}/process_frame`, {
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
