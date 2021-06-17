import axiosClient from './../axiosClient';
const blogApi = {
    createBlog(params) {
      const url = `/admin/blog/create`;
      return axiosClient.post(url,params);
    },
    getBlog() {
      const url = `/admin/blog/list`;
      return axiosClient.get(url);
    },
    blog(params) {
      const url = `/admin/blog/show`;
      return axiosClient.post(url,params);
    },
};
  
export default blogApi;