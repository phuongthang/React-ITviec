import { useEffect, useState } from "react";
import jobApi from "../../../../api/organization/jobApi";
import Constants from "../../../../constants/constants";
import { convertDate, queryString } from "../../../../helpers/helpers";
import Apply from "./apply_information";

function Information(props) {
    const parameters = {
        organization_id: queryString('organization_id'),
        job_id: queryString('job_id'),
    }
    const [data, setData] = useState({
    });
    const [avatar, setAvatar] = useState('/local/default.png');
    const getJobDetail = (parameters) => {
        jobApi.detailJob({
            organization_id: parameters.organization_id,
            job_id: parameters.job_id
        }).then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    console.log(response.data.jobs);
                    setData(response.data.jobs);
                    setAvatar(response.data.jobs.image ? response.data.jobs.image : '/local/default.png');
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
        getJobDetail(parameters);
    }, []);
    return (
        <div className="row">
            <div className="col-lg-4 col-xlg-3 col-md-5">
                <div className="card">
                    <div className="card-body">
                        <center className="m-t-30">
                            <img className="img-circle" src={"http://localhost:8888/backend-web/public" + avatar} width={150} />
                            <h4 className="card-title m-t-10"><label>{data.fullname ? data.fullname : ''}</label></h4>
                            <h6 className="card-subtitle"><label>{data.field ? data.field : ''}</label></h6>
                        </center>
                    </div>
                    <hr />
                    <hr />
                    <div className="card-body">
                        <h3>Chi tiết công việc</h3>
                        <div className="d-flex">
                            <p>Ngày bắt đầu : </p>
                            <p>{data.start_date ? convertDate(data.start_date) : ''}</p>
                        </div>
                        <div className="d-flex">
                            <p>Vị trí : </p>
                            <p>{data.location ? data.location : ''}</p>
                        </div>
                        <div className="d-flex">
                            <p>Số lượng : </p>
                            <p>{data.count ? data.count : ''}</p>
                        </div>
                        <div className="d-flex">
                            <p>Loại : </p>
                            <p>{data.type_id ? data.type_id : ''}</p>
                        </div>
                        <div className="d-flex">
                            <p>Ngày kết thúc : </p>
                            <p>{data.end_date ? convertDate(data.end_date) : ''}</p>
                        </div>
                    </div>
                    <hr />
                    <hr />
                </div>
            </div>
            <div className="col-lg-8 col-xlg-9 col-md-7">
                <div className="card">
                    <ul className="nav nav-tabs profile-tab" role="tablist">
                        <li className="nav-item"> <a className="nav-link active" data-toggle="tab" href="#detail" role="tab">Chi tiết</a> </li>
                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#apply" role="tab">Ứng tuyển</a> </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="detail" role="tabpanel">
                            <div className="col-md-12 col-lg-12 col-xlg-12 mt-3">
                                <div className="card job-item">
                                    <div class="card-body mb-30 d-flex justify-content-between">
                                        <div class="d-flex">
                                            <div class="m-l-20">
                                                <img alt="" src={"http://localhost:8888/backend-web/public" + avatar} className="img-circle img-responsive thumb-lg mb-3" alt="" />
                                            </div>
                                            <div class="m-l-20">
                                                <h4>{data.title ? data.title : ''}</h4>
                                                <div className="d-flex">
                                                    <p className="m-r-20 m-l-20">{data.experience_id ? data.experience_id : ''}</p>
                                                    <p className="m-r-20 m-l-20"><i className="fa fa-map-marker text-danger m-r-15"></i>{data.location ? data.location : ''}</p>
                                                    <p className="m-r-20 m-l-20"><i className="fa fa-bitcoin text-success m-r-10"></i>{data.salary ? data.salary : ''}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <h3>Mô tả : </h3>
                                    <p>{data.description ? data.description : ''}</p>
                                </div>
                                <div className="mt-5">
                                    <h3>Yêu cầu : </h3>
                                    <p>{data.required ? data.required : ''}</p>
                                </div>
                                <div className="mt-5">
                                    <h3>Đãi ngộ : </h3>
                                    <p>{data.organization_description ? data.organization_description : ''}</p>
                                </div>

                            </div>
                        </div>
                        <div className="tab-pane" id="apply" role="tabpanel">
                            <div className="card-body">
                                <Apply/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Information;