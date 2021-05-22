import axiosClient from './../axiosClient';
const profileApi = {
    getProfile(params) {
      const url = `/admin/profile/${params.id}`;
      return axiosClient.get(url,params);
    },
    postProfile(params) {
      const url = `/admin/profile`;
      return axiosClient.post(url,params);
    },
};
  
export default profileApi;