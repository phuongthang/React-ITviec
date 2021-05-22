import axiosClient from './../axiosClient';
const registerApi = {
    signUp(params) {
      const url = "/register";
      return axiosClient.post(url,params);
    },
};
  
export default registerApi;