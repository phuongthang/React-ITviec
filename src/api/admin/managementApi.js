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
};
  
export default managementApi;