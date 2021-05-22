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
    deleteOrganization(params){
      const url = `/admin/organization/delete`;
      return axiosClient.post(url,params);
    },
    deleteUser(params){
      const url = `/admin/user/delete`;
      return axiosClient.post(url,params);
    },
};
  
export default managementApi;