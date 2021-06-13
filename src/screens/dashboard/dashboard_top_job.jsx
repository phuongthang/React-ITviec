import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jobApi from '../../api/organization/jobApi';
import Constants from '../../constants/constants';
import { convertDate, convertExperience, convertType } from '../../helpers/helpers';
function DashboardTopJob(props) {
    const [renderTopJob, setRenderTopJob] = useState();
    const getJob = () => {
        jobApi.getJob().then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status = Constants.HTTP_STATUS.OK && response.data.jobs.length > 0) {
                    setRenderTopJob(response.data.jobs.map(item => (
                        <Link to={Constants.LINK_URL.JOB_INFO + `?organization_id=${item.organization_id}&job_id=${item.id}`} className="col-md-12 col-lg-12 col-xlg-12" key={item.id}>
                            <div className="job-item mb-3">
                                <div className="card-body mb-30 d-flex justify-content-between">
                                    <div className="d-flex">
                                        <div className="m-l-20">
                                            <img src={"http://localhost:8888/backend-web/public/" + (item.image ? item.image : '/local/default.png')} alt="" className="img-circle img-responsive thumb-lg mb-3" alt="" />
                                        </div>
                                        <div className="m-l-20">
                                            <h4>{item.title}</h4>
                                            <div className="d-flex text-secondary mt-4">
                                                <p className="m-r-20 m-l-20"><i className="fa fa-grav text-info m-r-10"></i>Trình độ : {convertExperience(item.experience_id)}</p>
                                                <p className="m-r-20 m-l-20"><i className="fa fa-map-marker text-danger m-r-10"></i>Vị trí : {item.location}</p>
                                                <p className="m-r-20 m-l-20"><i className="fa fa-bitcoin text-success m-r-10"></i>Lương: {item.salary}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center text-secondary">
                                        <button className="btn btn-sm btn-danger btn-status">{convertType(item.type_id)}</button>
                                        <div className="mt-3">Ngày tạo : {convertDate(item.created_at)}</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )));
                }
            }
        }, (error) => {
            props.history.push(Constants.LINK_URL.ERROR);
        });
    }
    useEffect(() => {
        getJob();
    }, [])
    return (
        <div className="list-job mt-5">
            <div className="section-tittle text-center mt-3 mb-3">
                <h2>Công Việc Hàng Đầu</h2>
                <div className=" text-center line"></div>
            </div>
            {
                renderTopJob
            }
            <div className="row">
                <div className="col-lg-12">
                    <div className="text-center mt-5">
                        <Link to={Constants.LINK_URL.SEARCH} className="btn btn-outline btn-secondary">Xem tất cả</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DashboardTopJob;