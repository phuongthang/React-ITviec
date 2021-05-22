import axiosClient from './../axiosClient';
const profileApi = {
    getProfile(params) {
      const url = `/user/profile/${params.id}`;
      return axiosClient.get(url,params);
    },
    postProfile(params) {
      const url = `/user/profile`;
      return axiosClient.post(url,params);
    },
};
  
export default profileApi;