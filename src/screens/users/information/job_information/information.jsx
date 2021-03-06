import { useEffect, useState } from "react";
import jobApi from "../../../../api/organization/jobApi";
import Constants from "../../../../constants/constants";
import { convertDate, convertExperience, convertType, getInfoUserLogin, queryString } from "../../../../helpers/helpers";
import ListApply from "../../management/management_apply/list_apply";
import Apply from "./apply_information";
import open from "../../../../assets/image/open.png";
import close from "../../../../assets/image/close.png";
function Information(props) {
    const userData = getInfoUserLogin();
    const parameters = {
        organization_id: queryString('organization_id'),
        job_id: queryString('job_id'),
        role: userData.role,
    }
    const [data, setData] = useState({
    });
    const [total, setTotal] = useState();
    const [activeCount, setActiveCount] = useState();
    const [avatar, setAvatar] = useState('/local/default.png');
    const getJobDetail = (parameters) => {
        jobApi.detailJob({
            organization_id: parameters.organization_id,
            job_id: parameters.job_id
        }).then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setData(response.data.jobs);
                    setTotal(response.data.total.count);
                    setActiveCount(response.data.active.count);
                    setAvatar(response.data.jobs.image ? response.data.jobs.image : '/local/default.png');
                    
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
                    <div className="card-body parent-item">
                        {
                            +activeCount < +data.count && <img className="child-item" src={open} alt="...." />
                        }
                        
                        {
                            +activeCount >= +data.count && <img className="child-item" src={close} alt="...." />
                        }
                        <h3>Chi ti???t c??ng vi???c</h3>
                        <div className="d-flex">
                            <p>Ng??y b???t ?????u : </p>
                            <p className="m-l-5"> {data.start_date ? convertDate(data.start_date) : ''}</p>
                        </div>
                        <div className="d-flex">
                            <p>V??? tr?? : </p>
                            <p className="m-l-5"> {data.location ? data.location : ''}</p>
                        </div>
                        <div className="d-flex">
                            <p>S??? l?????ng ???ng tuy???n : </p>
                            <p className="m-l-5"> {total ? total : 0}</p>
                        </div>
                        <div className="d-flex">
                            <p>S??? l?????ng tr??ng tuy???n : </p>
                            <p className="m-l-5">{activeCount ? activeCount : 0}/{data.count ? data.count : 0}</p>
                        </div>
                        <div className="d-flex">
                            <p>Lo???i : </p>
                            <p className="m-l-5"> {data.type_id ? convertType(data.type_id) : ''}</p>
                        </div>
                        <div className="d-flex">
                            <p>Ng??y k???t th??c : </p>
                            <p className="m-l-5"> {data.end_date ? convertDate(data.end_date) : ''}</p>
                        </div>
                    </div>
                    <hr />
                    <hr />
                </div>
            </div>
            <div className="col-lg-8 col-xlg-9 col-md-7">
                <div className="card">
                    <ul className="nav nav-tabs profile-tab" role="tablist">
                        <li className="nav-item"> <a className="nav-link active" data-toggle="tab" href="#detail" role="tab">Chi ti???t</a> </li>
                        {parameters.role === Constants.ROLE.USER && <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#apply" role="tab">???ng tuy???n</a> </li>}
                        {parameters.role === Constants.ROLE.ORGANIZATION && (parameters.organization_id === ''+userData.id ?<li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#list" role="tab">Danh s??ch</a> </li>:'')}
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="detail" role="tabpanel">
                            <div className="col-md-12 col-lg-12 col-xlg-12 mt-3">
                                <div className="job-item">
                                    <div className="card-body mb-30 d-flex justify-content-between">
                                        <div className="d-flex">
                                            <div className="m-l-20">
                                                <img alt="" src={"http://localhost:8888/backend-web/public" + avatar} className="img-circle img-responsive thumb-lg mb-3" alt="" />
                                            </div>
                                            <div className="m-l-20">
                                                <h4>{data.title ? data.title : ''}</h4>
                                                <div className="d-flex mt-4">
                                                    <p className="m-r-20 m-l-20"><i className="fa fa-grav text-info m-r-10"></i>Tr??nh ????? : {data.experience_id?convertExperience(data.experience_id):''}</p>
                                                    <p className="m-r-20 m-l-20"><i className="fa fa-map-marker text-danger m-r-10"></i>V??? tr?? : {data.location?data.location:''}</p>
                                                    <p className="m-r-20 m-l-20"><i className="fa fa-bitcoin text-success m-r-10"></i>L????ng: {data.salary?data.salary:''}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <h3>M?? t??? : </h3>
                                    <p>{data.description ? data.description : ''}</p>
                                </div>
                                <div className="mt-5">
                                    <h3>Y??u c???u : </h3>
                                    <p>{data.required ? data.required : ''}</p>
                                </div>
                                <div className="mt-5">
                                    <h3>????i ng??? : </h3>
                                    <p>{data.organization_description ? data.organization_description : ''}</p>
                                </div>

                            </div>
                        </div>
                        <div className="tab-pane" id="apply" role="tabpanel">
                            <div className="card-body">
                            {parameters.role === Constants.ROLE.USER && <Apply/>}
                            </div>
                        </div>
                        <div className="tab-pane" id="list" role="tabpanel">
                            <div className="card-body">
                                <ListApply/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default Information;