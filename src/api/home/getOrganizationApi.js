import axiosClient from './../axiosClient';
const getOrganizationApi = {
    getOrganization(params) {
      const url = `/user/organization/get`;
      return axiosClient.get(url,params);
    },
};
  
export default getOrganizationApi;