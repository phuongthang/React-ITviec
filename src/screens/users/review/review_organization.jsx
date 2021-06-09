import { useEffect, useState } from "react";
import reviewApi from "../../../api/user/reviewApi";
import Constants from "../../../constants/constants";
import { convertDateTime, getInfoUserLogin, queryString } from "../../../helpers/helpers";
import Vote from "./vote";
import LoadingOverlay from '../../loading/loading_overlay';

function ReviewOrganization(props) {
    const userData = getInfoUserLogin();
    const parameters = {
        user_id: userData.id,
        organization_id: queryString('organization_id'),
    }
    const [avgVote, setAvgVote] = useState(0);
    const [rating, setRating] = useState(0);
    const [count, setCount] = useState(5);
    const [color, setColor] = useState({
        filled: "#ffb22b",
        unfilled: "#DCDCDC",
    });


    const [status, setStatus] = useState(true);
    const [content, setContent] = useState('');
    const [renderReview, setRenderReview] = useState();
    const [loadingOverlay, setLoadingOverlay] = useState(false);
    const onCheck = () => {
        setStatus(!status);
    }
    const handleChange = (e) => {
        const value = e.target.value;
        setContent(value);
    }
    const submitReview = () => {
        setLoadingOverlay(true);
        const params = {
            organization_id: parameters.organization_id,
            user_id: parameters.user_id,
            content: content,
            status: (status ? 1 : 0),
            vote: rating
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
                setLoadingOverlay(false);
                return () => mounted = false;
            });
    }
    const showReview = (parameters) => {
        reviewApi.showReview({
            organization_id: parameters.organization_id
        }).then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setAvgVote(+response.data.total.total/response.data.reviews.length);
                    setRenderReview(response.data.reviews.map(item => (
                        <div className="d-flex flex-row comment-row" key={item.id}>
                            {
                                item.status === 1 && (<><div className="p-2"><img src={"http://localhost:8888/backend-web/public/" + (item.image ? item.image : '/local/default.png')} alt="user" width="50" /></div>
                                    <div className="comment-text w-100">
                                        <div className="review-vote mb-1">
                                            {
                                                item.vote === 1 && (<>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active" ></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                </>)
                                            }
                                            {
                                                item.vote === 2 && (<>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                </>)
                                            }
                                            {
                                                item.vote === 3 && (<>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                </>)
                                            }
                                            {
                                                item.vote === 4 && (<>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                </>)
                                            }
                                            {
                                                item.vote === 5 && (<>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                </>)
                                            }
                                        </div>
                                        <h5>{item.fullname}</h5>
                                        <div className="comment-footer">
                                            <span className="date">{convertDateTime(item.created_at)}</span>
                                            <span className="action-icons">
                                            </span>
                                        </div>
                                        <p className="m-b-5 m-t-10">{item.content}</p>
                                    </div></>)
                            }
                            {
                                item.status === 0 && (<>
                                    <div className="p-2"><img src={"http://localhost:8888/backend-web/public/local/default.png"} alt="user" width="50" /></div>
                                    <div className="comment-text w-100">
                                        <div className="review-vote mb-1">
                                        {
                                                item.vote === 1 && (<>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active" ></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                </>)
                                            }
                                            {
                                                item.vote === 2 && (<>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                </>)
                                            }
                                            {
                                                item.vote === 3 && (<>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                </>)
                                            }
                                            {
                                                item.vote === 4 && (<>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-unactive"></i>
                                                </>)
                                            }
                                            {
                                                item.vote === 5 && (<>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                    <i className="fa fa-star cursor-pointer text-white fa-star-small-active"></i>
                                                </>)
                                            }
                                        </div>
                                        <h5>Chế độ ẩn danh</h5>
                                        <div className="comment-footer">
                                            <p className="date">{convertDateTime(item.created_at)}</p>
                                            <span className="action-icons">
                                            </span>
                                        </div>
                                        <p className="m-b-5 m-t-10">{item.content}</p>
                                    </div></>)
                            }
                        </div>
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
    useEffect(() => {
        showReview(parameters);
    }, []);
    return (
        <>
            <div className="text-center mt-3">
                {(avgVote > 0.5 && avgVote <=1.5) && <div className="avg-vote">
                    <h2 className="avg-vote-text">{avgVote}</h2>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-active"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-unactive"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-unactive"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-unactive"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-unactive"></i>
                </div>}
                {(avgVote > 1.5 && avgVote <=2.5) && <div className="avg-vote">
                    <h2 className="avg-vote-text">{avgVote}</h2>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-active"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-active"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-unactive"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-unactive"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-unactive"></i>
                </div>}
                {(avgVote > 2.5 && avgVote <=3.5) && <div className="avg-vote">
                    <h2 className="avg-vote-text">{avgVote}</h2>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-active"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-active"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-active"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-unactive"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-unactive"></i>
                </div>}
                {(avgVote > 3.5 && avgVote <=4.5) && <div className="avg-vote">
                    <h2 className="avg-vote-text">{avgVote}</h2>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-active"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-active"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-active"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-active"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-unactive"></i>
                </div>}
                {(avgVote > 4.5 && avgVote <=5) && <div className="avg-vote">
                    <h2 className="avg-vote-text">{avgVote}</h2>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-active"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-active"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-active"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-active"></i>
                    <i className="fa fa-star cursor-pointer text-white fa-star-vote-active"></i>
                </div>}
            </div>
            <div className="card-body box-review">
                {renderReview}
            </div>
            <div className="card-body b-t">
                <div className="m-b-10 d-flex">
                    <label className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" checked={status} onChange={onCheck} />
                        <span className="custom-control-label anonymity m-r-10">Công khai</span>
                    </label>
                    <Vote rating={rating} onRating={(rate) => setRating(rate)} count={count} color={color} />
                </div>
                <div className="row">
                    <div className="col-11">
                        <textarea placeholder="Nhận xét ..." className="form-control b-0" name="content" onChange={handleChange}></textarea>
                    </div>
                    <div className="col-1 text-right">
                        <button onClick={submitReview} type="button" className="btn btn-info btn-circle btn-lg"><i className="fa fa-paper-plane-o"></i> </button>
                    </div>
                </div>
                {loadingOverlay && <LoadingOverlay />}
            </div>
        </>
    );
}
export default ReviewOrganization;