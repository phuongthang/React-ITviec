import axiosClient from './../axiosClient';
const reviewApi = {
    createReview(params) {
      const url = `/user/review/create`;
      return axiosClient.post(url,params);
    },
    showReview(params) {
        const url = `/user/review/show`;
        return axiosClient.post(url,params);
      },
};
  
export default reviewApi;