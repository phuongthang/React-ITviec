import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Constants from '../../constants/constants';
import getCVApi from '../../api/home/getCVApi';
function DashboardTopCV(props) {
    const [renderTopCV, setRenderTopCV] = useState();
    const getCV = () => {
        getCVApi.getCV().then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setRenderTopCV(response.data.cvs.map(item => (
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6" key={item.id}>
                            <div className="single-services text-center mb-30">
                                <div className="services-ion">
                                    <Link to={`${Constants.LINK_URL.USER_INFO}?user_id=${item.user_id}`} className="logo-hover">
                                    <img src={"http://localhost:8888/backend-web/public" +(item.image ? item.image : '/local/default.png')} alt="organization" className="thumb-sd round-img" />
                                    </Link>
                                </div>
                                <div className="services-cap mt-2">
                                    <h5><Link to={`${Constants.LINK_URL.USER_INFO}?user_id=${item.id}`}>{item.fullname}</Link></h5>
                                    <span><Link className="text-work" >tại {item.address}</Link></span>
                                </div>
                            </div>
                        </div>
                    )));
                }
            }
            return () => mounted = false;

        }, (error) => {
            let mounted = true;
            if (mounted) {
                props.history.push(Constants.LINK_URL.ERROR);
            }
            return () => mounted = false;
        });
    }
    useEffect(()=>{
        getCV();
    },[]);
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-tittle text-center mt-3 mb-3">
                        <h2>Người Ứng Tuyển Hàng Đầu</h2>
                        <div className=" text-center line"></div>
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-contnet-center">
                {renderTopCV}
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="text-center mt-5">
                        <Link to={Constants.LINK_URL.SEARCH_OFFER} className="btn btn-outline btn-secondary">Xem tất cả</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
export default DashboardTopCV;