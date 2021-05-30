import { useEffect, useState } from "react";
import reviewApi from "../../../api/user/reviewApi";
import Constants from "../../../constants/constants";
import { queryString } from "../../../helpers/helpers";

function ReviewOrganization(props) {
    const parameters = {
        user_id: localStorage.getItem('id'),
        organization_id: queryString('organization_id'),
    }
    const [status, setStatus] = useState(true);
    const [content, setContent] = useState('');
    const [renderReview, setRenderReview] = useState();
    const onCheck = () => {
        setStatus(!status);
    }
    const handleChange = (e) => {
        const value = e.target.value;
        setContent(value);
    }
    const submitReview = () => {
        const params = {
            organization_id:parameters.organization_id,
            user_id:parameters.user_id,
            content:content,
            status:(status?1:0),
        }
        reviewApi.createReview(
            params).then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    window.location.reload();
                }
            }
            return () => mounted = false;
        }, (error) => {
            let mounted = true;
            if (mounted) {
                if (error.response.status === Constants.HTTP_STATUS.UNAUTHORIZED) {
                    console.log("Fail");
                }

            }
            return () => mounted = false;
        });
    }
    const showReview = (parameters) =>{
        reviewApi.showReview({
            organization_id:parameters.organization_id
        }).then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    console.log(response.data.reviews);
                    setRenderReview(response.data.reviews.map(item=>(
                        <li key={item.id}>
                            {
                                item.status === 1 && (<><div className="chat-img"><img src={"http://localhost:8888/backend-web/public/" + (item.image ? item.image : '/local/default.png')} alt="user" /></div>
                                <div className="chat-content">
                                    <h5>{item.fullname}</h5>
                                    <div className="box bg-light-info">{item.content}</div>
                                </div>
                                <div className="chat-time">{item.created_at}</div></>)
                            }
                            {
                                item.status === 0 && (<><div className="chat-img"><img src="http://localhost:8888/backend-web/public/local/default.png" alt="user" /></div>
                                <div className="chat-content">
                                    <h6>Chế độ ẩn danh</h6>
                                    <div className="box bg-light-info">{item.content}</div>
                                </div>
                                <div className="chat-time">{item.created_at}</div></>)
                            }
                            
                        </li>
                    )));
                }
            }
            return () => mounted = false;
        }, (error) => {
            let mounted = true;
            if (mounted) {
                if (error.response.status === Constants.HTTP_STATUS.UNAUTHORIZED) {
                    console.log("Fail");
                }

            }
            return () => mounted = false;
        });
    }
    useEffect(()=>{
        showReview(parameters);
    },[]);
    return (
        <>
            <div className="card-body">
                <div className="chat-box">
                    <ul className="chat-list">
                        {renderReview}
                    </ul>
                </div>
            </div>
            <div className="card-body b-t">
                <div className="m-b-10">
                    <label className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" checked={status} onChange={onCheck} />
                        <span className="custom-control-label anonymity">Công khai</span>
                    </label>
                </div>
                <div className="row">
                    <div className="col-11">
                        <textarea placeholder="Nhận xét ..." className="form-control b-0" name="content" onChange={handleChange}></textarea>
                    </div>
                    <div className="col-1 text-right">
                        <button onClick={submitReview} type="button" className="btn btn-info btn-circle btn-lg"><i className="fa fa-paper-plane-o"></i> </button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ReviewOrganization;