import axiosClient from './../axiosClient';
const ProvinceApi = {
    getProvinceApi() {
      const url = `/address/province`;
      return axiosClient.get(url);
    },
};
  
export default ProvinceApi;