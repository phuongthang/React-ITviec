import axiosClient from './../axiosClient';
const profileApi = {
    getProfile(params) {
      const url = `/user/profile/show`;
      return axiosClient.post(url,params);
    },
    postProfile(params) {
      const url = `/user/profile/update`;
      return axiosClient.post(url,params);
    },
};
  
export default profileApi;