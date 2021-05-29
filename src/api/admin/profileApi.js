import axiosClient from './../axiosClient';
const profileApi = {
    getProfile(params) {
      const url = `/admin/profile/show`;
      return axiosClient.post(url,params);
    },
    postProfile(params) {
      const url = `/admin/profile/update`;
      return axiosClient.post(url,params);
    },
};
  
export default profileApi;