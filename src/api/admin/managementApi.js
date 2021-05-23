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
};
  
export default managementApi;