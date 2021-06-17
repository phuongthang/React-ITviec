import { useEffect, useState } from "react";
import Constants from "../../../constants/constants";
import { convertDate, queryString } from "../../../helpers/helpers";
import { Link } from 'react-router-dom';
import blogApi from "../../../api/admin/blogApi";

function Show(props) {
    const [blog, setBlog] = useState(null);
    const parameters = {
        blog_id: queryString('blog_id')
    }
    const getBlog = (blog_id) => {
        blogApi.blog({ blog_id: blog_id }).then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                console.log(response.data);
                setBlog(response.data.blog.content);
            }
        }, (error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        getBlog(parameters.blog_id);
    }, []);
    return (
        <div className="row">
            <div className="col-lg-12 col-xlg-12 col-md-12">
                <div className="card">
                    <ul className="nav nav-tabs profile-tab" role="tablist">
                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#list" role="tab">Chi tiết</a> </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="list" role="tabpanel">
                            <div className="card-body">
                                <div className="text-center" dangerouslySetInnerHTML={{ __html: blog }}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Show;