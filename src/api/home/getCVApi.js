import axiosClient from './../axiosClient';
const getCVApi = {
    getCV() {
      const url = `/admin/cv/get`;
      return axiosClient.get(url);
    },
};
  
export default getCVApi;