import axiosClient from './../axiosClient';
const profileApi = {
    getProfile(params) {
      const url = `/organization/profile/${params.id}`;
      return axiosClient.get(url,params);
    },
    postProfile(params) {
      const url = `/organization/profile`;
      return axiosClient.post(url,params);
    },
};
  
export default profileApi;