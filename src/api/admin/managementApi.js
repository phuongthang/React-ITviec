import axiosClient from './../axiosClient';
const managementApi = {
    getOrganization() {
      const url = `/admin/management/organizations`;
      return axiosClient.get(url);
    },
    getUser() {
        const url = `/admin/management/users`;
        return axiosClient.get(url);
    },
    getJob() {
      const url = `/admin/management/jobs`;
      return axiosClient.get(url);
    },
    getCV() {
      const url = `/admin/management/cvs`;
      return axiosClient.get(url);
    },
    getOffer(params) {
      const url = `/user/management/offer`;
      return axiosClient.post(url,params);
    },
    deleteOrganization(params){
      const url = `/admin/organization/delete`;
      return axiosClient.post(url,params);
    },
    deleteUser(params){
      const url = `/admin/user/delete`;
      return axiosClient.post(url,params);
    },
    deleteJob(params){
      const url = `/admin/job/delete`;
      return axiosClient.post(url,params);
    },
    activeJob(params){
      const url = `/admin/job/active`;
      return axiosClient.post(url,params);
    },
    deleteCV(params){
      const url = `/admin/cv/delete`;
      return axiosClient.post(url,params);
    },
    activeCV(params){
      const url = `/admin/cv/active`;
      return axiosClient.post(url,params);
    },
    activeStatusJob(params){
      const url = `/admin/job/status`;
      return axiosClient.post(url,params);
    },
    activeOrganization(params){
      const url = `/admin/organization/active`;
      return axiosClient.post(url,params);
    },
};
  
export default managementApi;