import axiosClient from './../axiosClient';
const loginApi = {
    signIn(params) {
      const url = "/user/login";
      return axiosClient.post(url,params);
    },
};
  
export default loginApi;