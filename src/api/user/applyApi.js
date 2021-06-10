import axiosClient from './../axiosClient';
const applyApi = {
    createApply(params) {
      const url = `/user/apply/create`;
      return axiosClient.post(url,params);
    },
    getApply(params) {
      const url = `/organization/apply/show`;
      return axiosClient.post(url,params);
    },
    updateStatus(params) {
      const url = `/organization/apply/status`;
      return axiosClient.post(url,params);
    },
    getConfirm(params) {
      const url = `/user/apply/confirm`;
      return axiosClient.post(url,params);
    },
};
  
export default applyApi;