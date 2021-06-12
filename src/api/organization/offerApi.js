import axiosClient from './../axiosClient';
const OfferApi = {
    createOffer(params) {
      const url = `/organization/offer/create`;
      return axiosClient.post(url,params);
    },
};
  
export default OfferApi;