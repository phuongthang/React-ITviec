import axiosClient from './../axiosClient';
const WardApi = {
    getWardApi(id_district) {
      const url = `/address/ward/${id_district}`;
      return axiosClient.get(url);
    },
};
  
export default WardApi;