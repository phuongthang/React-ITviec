import axiosClient from './../axiosClient';
const profileApi = {
    getProfile(params) {
      const url = `/organization/profile/show`;
      return axiosClient.post(url,params);
    },
    postProfile(params) {
      const url = `/organization/profile/update`;
      return axiosClient.post(url,params);
    },
};
  
export default profileApi;