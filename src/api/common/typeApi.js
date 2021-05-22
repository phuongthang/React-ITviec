import axiosClient from './../axiosClient';
const TypeApi = {
    getTypeApi() {
      const url = `/common/types`;
      return axiosClient.get(url);
    },
};
  
export default TypeApi;