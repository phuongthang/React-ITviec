import axiosClient from './../axiosClient';
const LanguageApi = {
    getLanguageApi() {
      const url = `/common/languages`;
      return axiosClient.get(url);
    },
};
  
export default LanguageApi;