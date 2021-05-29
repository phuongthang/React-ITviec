import axiosClient from './../axiosClient';
const applyApi = {
    createApply(params) {
      const url = `/user/apply/create`;
      return axiosClient.post(url,params);
    },
};
  
export default applyApi;