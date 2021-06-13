import React, { useEffect, useState } from "react";
import cvApi from "../../../../api/user/cvApi";
import Constants from "../../../../constants/constants";
import { queryString } from "../../../../helpers/helpers";
import PDF from "./pdf";
function Information(props) {
    
    const parameters = {
        user_id:queryString('user_id'),
    }
    const [avatar, setAvatar] = useState('/local/default.png');
    const [data, setData] = useState({
        fullname: '',
        email: '',
        phone: '',
        address: '',
        description: '',
        position: '',
        image: '',
    });
    const getCV = (parameters) => {
        cvApi.showCV({ user_id: parameters.user_id }).then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setData(response.data.data);
                    setAvatar(response.data.data.image === null ? '/local/default.png' : response.data.data.image);
                }
            }
        }, (error) => {
            let mounted = true;
            if (mounted) {
                props.history.push(Constants.LINK_URL.ERROR);
            }
            return () => mounted = false;
        });
    }
    useEffect(() => {
        getCV(parameters);
    }, []);

    return (
        <div className="col-lg-12 col-xlg-12 col-md-12">
            <div className="card">
                <ul className="nav nav-tabs profile-tab d-flex justify-content-center" role="tablist">
                    <li className="nav-item"> <a className="nav-link active" data-toggle="tab" href="#cvonline" role="tab">CV Online</a> </li>
                    <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#pdf" role="tab">PDF</a> </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane active" id="cvonline" role="tabpanel">
                        <div className="card-body">
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-8 col-xlg-6 col-md-8 ">
                                    <div className="card background-cv">
                                        <div className="card-body">
                                            <center className="m-t-10">
                                                <img className="img-circle" src={"http://localhost:8888/backend-web/public" + avatar} width={150} />
                                                <h4 className="card-title m-t-10"><label>{data.fullname}</label></h4>
                                                <h6 className="card-subtitle"><label>{data.position}</label></h6>
                                            </center>
                                        </div>
                                        <hr />
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-lg-12 text-center">
                                                    <h3><label htmlFor="">Giới thiệu</label></h3>
                                                </div>
                                                <div className="col-lg-6">
                                                    <label htmlFor="">{data.description}</label>
                                                </div>
                                                <div className="col-lg-6">
                                                    <small className="text-muted">Email:</small>
                                                    <h6><label>{data.email}</label></h6>
                                                    <small className="text-muted">Số điện thoại:</small>
                                                    <h6><label>{data.phone}</label></h6>
                                                    <small className="text-muted">Địa chỉ:</small>
                                                    <h6><label>{data.address}</label></h6>
                                                    <button className="btn btn-circle btn-info m-r-5"><i className="fa fa-facebook" /></button>
                                                    <button className="btn btn-circle btn-success m-r-5"><i className="fa fa-twitter" /></button>
                                                    <button className="btn btn-circle btn-danger"><i className="fa fa-instagram" /></button>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-lg-12 text-center">
                                                    <h3><label htmlFor="">Kỹ Năng</label></h3>
                                                    <div className="row">
                                                        <div className="col-md-6 p-r-40 m-t-20 m-b-10">
                                                            <h5 className="m-t-20"><label htmlFor="">Html</label><span className="pull-right"><label htmlFor="">90%</label></span></h5>
                                                            <div className="progress ">
                                                                <div className="progress-bar bg-danger wow animated progress-animated" style={{ width: '90%', height: '10px' }} role="progressbar"> <span className="sr-only">60% Complete</span> </div>
                                                            </div>
                                                            <h5 className="m-t-20"><label htmlFor="">Css</label><span className="pull-right"><label htmlFor="">70%</label></span></h5>
                                                            <div className="progress">
                                                                <div className="progress-bar bg-info wow animated progress-animated" style={{ width: '70%', height: '10px' }} role="progressbar"> <span className="sr-only">60% Complete</span> </div>
                                                            </div>
                                                            <h5 className="m-t-20"><label htmlFor="">Javascript</label><span className="pull-right"><label htmlFor="">80%</label></span></h5>
                                                            <div className="progress">
                                                                <div className="progress-bar bg-success wow animated progress-animated" style={{ width: '80%', height: '10px' }} role="progressbar"> <span className="sr-only">60% Complete</span> </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 p-r-40 m-t-20 m-b-10">
                                                            <h5 className="m-t-20"><label htmlFor="">Laravel</label><span className="pull-right"><label htmlFor="">75%</label></span></h5>
                                                            <div className="progress">
                                                                <div className="progress-bar bg-warning wow animated progress-animated" style={{ width: '75%', height: '10px' }} role="progressbar"> <span className="sr-only">60% Complete</span> </div>
                                                            </div>
                                                            <h5 className="m-t-20"><label htmlFor="">ReactJs</label><span className="pull-right"><label htmlFor="">70%</label></span></h5>
                                                            <div className="progress">
                                                                <div className="progress-bar bg-primary wow animated progress-animated" style={{ width: '70%', height: '10px' }} role="progressbar"> <span className="sr-only">60% Complete</span> </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane" id="pdf" role="tabpanel">
                        <div className="card-body">
                            <div className="row d-flex justify-content-center">
                                <PDF/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Information;