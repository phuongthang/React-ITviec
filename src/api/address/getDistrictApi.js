import axiosClient from './../axiosClient';
const DistrictApi = {
    getDistrictApi(id_province) {
      const url = `/address/district/${id_province}`;
      return axiosClient.get(url);
    },
};
  
export default DistrictApi;