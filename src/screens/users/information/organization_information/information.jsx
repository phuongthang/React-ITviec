import { useEffect, useState } from "react";
import jobApi from "../../../../api/organization/jobApi";
import profileApi from "../../../../api/organization/profileApi";
import Constants from "../../../../constants/constants";
import { calcTime, convertDate, convertExperience, convertType, queryString } from "../../../../helpers/helpers";
import { Link } from 'react-router-dom';
import ReviewOrganization from "../../review/review_organization";

function Information(props) {
    const parameters = {
        id: queryString('organization_id')
    }
    const [organization, setOrganization] = useState({
        username: '',
        fullname: '',
        email: '',
        phone: '',
        address: '',
        description: '',
        field: '',
        establishment: '',
    });
    const [avatar, setAvatar] = useState('/local/default.png');
    const getProfile = (id) => {
        profileApi.getProfile({
            id: id,
        }).then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setOrganization(response.data.organization);
                    setAvatar(response.data.organization.image ? response.data.organization.image : '/local/default.png');
                }
            }
            return () => mounted = false;
        }, (error) => {
            let mounted = true;
            if (mounted) {
                if (error.response.status === Constants.HTTP_STATUS.UNAUTHORIZED) {
                    props.history.push(Constants.LINK_URL.ERROR);
                }

            }
            return () => mounted = false;
        });
    }

    const [listJob, setListJob] = useState(null);
    const [renderListJob, setRenderListJob] = useState();
    const getListJob = (organizationId) => {
        jobApi.indexJob({ organization_id: organizationId }).then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                setListJob(response.data.jobs);
            }
        }, (error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        getProfile(parameters.id);
        getListJob(parameters.id);
    }, []);
    useEffect(() => {
        if (listJob) {
            setRenderListJob(listJob.map(item => (
                <Link to={Constants.LINK_URL.JOB_INFO + `?organization_id=${parameters.id}&job_id=${item.id}`} className="col-md-12 col-lg-12 col-xlg-12" key={item.id}>
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
    }, [listJob]);
    return (
        <div className="row">
            <div className="col-lg-4 col-xlg-3 col-md-5">
                <div className="card">
                    <div className="card-body left-profile">
                        <center className="m-t-30">
                            <img className="img-circle" src={"http://localhost:8888/backend-web/public" + avatar} width={150} />
                            <h4 className="card-title m-t-10"><label>{organization.fullname}</label></h4>
                            <h6 className="card-subtitle"><label>{organization.field}</label></h6>
                        </center>
                    </div>
                    <hr />
                    <div className="card-body">
                        <small className="text-muted">Email:</small>
                        <h6><label>{organization.email}</label></h6>
                        <small className="text-muted p-t-30 db">Số điện thoại:</small>
                        <h6><label>{organization.phone}</label></h6>
                        <small className="text-muted p-t-30 db">Địa chỉ:</small>
                        <h6><label>{organization.address}</label></h6>
                        <br />
                        <div className="map-box">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470029.1604841957!2d72.29955005258641!3d23.019996818380896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C+Gujarat!5e0!3m2!1sen!2sin!4v1493204785508" width="100%" height={150} frameBorder={0} style={{ "border": "0" }} allowFullScreen />
                        </div> <small className="text-muted p-t-30 db">Mạng xã hội</small>
                        <br />
                        <button className="btn btn-circle btn-info m-r-5"><i className="fa fa-facebook" /></button>
                        <button className="btn btn-circle btn-success m-r-5"><i className="fa fa-twitter" /></button>
                        <button className="btn btn-circle btn-danger"><i className="fa fa-instagram" /></button>
                    </div>
                </div>
            </div>
            <div className="col-lg-8 col-xlg-9 col-md-7">
                <div className="card">
                    <ul className="nav nav-tabs profile-tab" role="tablist">
                        <li className="nav-item"> <a className="nav-link active" data-toggle="tab" href="#profile" role="tab">Thông tin cá nhân</a> </li>
                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#job" role="tab">Công việc</a> </li>
                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#review" role="tab">Đánh giá</a> </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="profile" role="tabpanel">
                            <div className="card-body">
                                <p className="btn btn-danger">Mô tả :</p>
                                <p className="m-t-30"><label>{organization.description}</label></p>
                            </div>
                        </div>
                        <div className="tab-pane" id="job" role="tabpanel">
                            <div className="card-body">
                                {renderListJob}
                            </div>
                        </div>
                        <div className="tab-pane" id="review" role="tabpanel">
                            <ReviewOrganization/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Information;