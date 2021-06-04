import React, { useEffect, useState } from 'react';
import getOrganizationApi from '../../api/home/getOrganizationApi';
import { Link } from 'react-router-dom';
import Constants from '../../constants/constants';
function DashboardTopOrganization(props) {
    const [renderTopOrganization, setRenderTopOrganization] = useState();
    const getOrganization = () => {
        getOrganizationApi.getOrganization().then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setRenderTopOrganization(response.data.organizations.map(item => (
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6" key={item.id}>
                            <div className="single-services text-center mb-30">
                                <div className="services-ion">
                                    <Link to={`${Constants.LINK_URL.ORGANIZATION_INFO}?organization_id=${item.id}`}>
                                    <img src={"http://localhost:8888/backend-web/public" +(item.image ? item.image : '/local/default.png')} alt="organization" className="thumb-sd round-img" />
                                    </Link>
                                </div>
                                <div className="services-cap mt-2">
                                    <h5><Link to={`${Constants.LINK_URL.ORGANIZATION_INFO}?organization_id=${item.id}`}>{item.fullname}</Link></h5>
                                    <span><Link className="text-warning" to={`${Constants.LINK_URL.ORGANIZATION_INFO}?organization_id=${item.id}`}>(653)</Link></span>
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

            }
            return () => mounted = false;
        });
    }
    useEffect(()=>{
        getOrganization();
    },[]);
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="section-tittle text-center mt-3 mb-3">
                        <h2>Browse Top Categories </h2>
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-contnet-center">
                {renderTopOrganization}
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="text-center mt-5">
                        <a href="job_listing.html" className="btn btn-outline btn-secondary">Xem tất cả</a>
                    </div>
                </div>
            </div>
        </>
    );
}
export default DashboardTopOrganization;