import axiosClient from '../axiosClient';
const ExperienceApi = {
    getExperienceApi() {
      const url = `/common/experiences`;
      return axiosClient.get(url);
    },
};
  
export default ExperienceApi;