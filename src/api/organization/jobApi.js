import axiosClient from './../axiosClient';
const jobApi = {
    createJob(params) {
      const url = `/organization/job/create`;
      return axiosClient.post(url,params);
    },
    indexJob(params) {
      const url = `/organization/job/list`;
      return axiosClient.post(url,params);
    },

    editJob(params) {
      const url = `/organization/job/edit`;
      return axiosClient.post(url,params);
    },

    updateJob(params) {
      const url = `/organization/job/update`;
      return axiosClient.post(url,params);
    },
    detailJob(params) {
      const url = `/organization/job/detail`;
      return axiosClient.post(url,params);
    },
    getJob() {
      const url = `/user/job/get`;
      return axiosClient.get(url);
    },
    queryJob(params) {
      const url = `/user/job/query`;
      return axiosClient.post(url,params);
    },
};
  
export default jobApi;