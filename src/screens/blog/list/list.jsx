import { useEffect, useState } from "react";
import Constants from "../../../constants/constants";
import {convertDate } from "../../../helpers/helpers";
import { Link } from 'react-router-dom';
import blogApi from "../../../api/admin/blogApi";

function List(props) {
    const [image, setImage] = useState();
    const [listBlog, setListBlog] = useState(null);
    const [renderListBlog, setRenderListBlog] = useState();
    const getListBlog = () => {
        blogApi.getBlog().then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                setListBlog(response.data.blogs);
                setImage(response.data.blogs[0].content);

            }
        }, (error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        getListBlog();
    }, []);
    useEffect(() => {
        if (listBlog) {
            setRenderListBlog(listBlog.map(item => (
                <Link to={`${Constants.LINK_URL.BLOG_SHOW}?blog_id=${item.id}`} className="col-md-12 col-lg-12 col-xlg-12" key={item.id}>
                    <div className="job-item mb-3">
                        <div className="card-body mb-30 d-flex justify-content-between">
                            <div className="d-flex">
                                <div className="m-l-20">
                                    <img src={"http://localhost:8888/backend-web/public"+item.image} alt="" className="thumb-blog mb-3" alt="" />
                                </div>
                                <div className="m-l-20">
                                    <h3>{item.title}</h3>
                                </div>
                            </div>
                            <div className="text-center text-secondary">
                                <button className="btn btn-sm btn-danger btn-status">Xem thêm</button>
                                <div className="mt-3">Ngày tạo : {convertDate(item.created_at)}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            )));
        }
    }, [listBlog]);
    return (
        <div className="row">
            <div className="col-lg-12 col-xlg-12 col-md-12">
                <div className="card">
                    <ul className="nav nav-tabs profile-tab" role="tablist">
                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#list" role="tab">Danh sách</a> </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="list" role="tabpanel">
                            <div className="card-body">
                                {renderListBlog}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default List;