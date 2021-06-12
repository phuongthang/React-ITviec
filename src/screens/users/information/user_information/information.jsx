import { useEffect, useState } from "react";
import OfferApi from "../../../../api/organization/offerApi";
import cvApi from "../../../../api/user/cvApi";
import profileApi from "../../../../api/user/profileApi";
import Constants from "../../../../constants/constants";
import { getInfoUserLogin, queryString } from "../../../../helpers/helpers";
import LoadingOverlay from "../../../loading/loading_overlay";

function Information(props) {
    const parameters = {
        id: queryString('user_id'),
    }
    const userData = getInfoUserLogin();
    const [user, setUser] = useState({
        username: '',
        fullname: '',
        email: '',
        phone: '',
        address: '',
        description: '',
        position: '',
        image: '',
    });
    const [data, setData] = useState({
        fullname: '',
        email: '',
        phone: '',
        address: '',
        description: '',
        position: '',
        image: '',
    });
    const [file, setFile] = useState();
    const [flag, setFlag] = useState(0);
    const [message, setMessage] = useState();
    const [loadingOverlay, setLoadingOverlay] = useState(false);
    const [avatarProfile, setAvatarProfile] = useState('/local/default.png');
    const [avatarCV, setAvatarCV] = useState('/local/default.png');
    const getCV = (id) => {
        cvApi.getCV({ id: id }).then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setData(response.data.data);
                    setAvatarCV(response.data.data.image === null ? '/local/default.png' : response.data.data.image);
                }
            }
        }, (error) => {
            let mounted = true;
            if (mounted) {
                console.log("false");
            }
            return () => mounted = false;
        });
    }
    const getProfile = (id) => {
        profileApi.getProfile({
            id: id,
        }).then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setUser(response.data.user);
                    setAvatarProfile(response.data.user.image ? response.data.user.image : '/local/default.png');
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
    const handleChangeFile = (e) => {
        setFile(e.target.files[0]);
        setFlag(1);
    }

    const handleChange = (e) =>{
        setMessage(e.target.value);
    }
    const sendOffer = () => {
        setLoadingOverlay(true);
        const form = new FormData();
        form.append("user_id", parameters.id);
        form.append("organization_id", userData.id);
        form.append("message", message);
        if (flag === 1) {
            form.append("file", file);
        }
        OfferApi.createOffer(form).then((response) => {
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
    useEffect(() => {
        getProfile(parameters.id);
        getCV(parameters.id);
    }, []);
    return (
        <div className="row">
            <div className="col-lg-4 col-xlg-3 col-md-5">
                <div className="card">
                    <div className="card-body">
                        <center className="m-t-30">
                            <img className="img-circle" src={"http://localhost:8888/backend-web/public" + avatarProfile} width={150} />
                            <h4 className="card-title m-t-10"><label>{user.fullname}</label></h4>
                            <h6 className="card-subtitle"><label>{user.position}</label></h6>
                        </center>
                    </div>
                    <hr />
                    <div className="card-body">
                        <small className="text-muted">Email:</small>
                        <h6><label>{user.email}</label></h6>
                        <small className="text-muted p-t-30 db">Số điện thoại:</small>
                        <h6><label>{user.phone}</label></h6>
                        <small className="text-muted p-t-30 db">Địa chỉ:</small>
                        <h6><label>{user.address}</label></h6>
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
                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#CV" role="tab">CV</a> </li>
                        {
                            userData.role === 2 && <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#offer" role="tab">Đề xuất</a> </li>
                        }
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="profile" role="tabpanel">
                            <div className="card-body">
                                <p className="btn btn-danger">Mô tả :</p>
                                <p className="m-t-30"><label>{user.description}</label></p>
                            </div>
                        </div>
                        <div className="tab-pane" id="CV" role="tabpanel">
                            <div className="card-body">
                                <div className="row d-flex justify-content-center">
                                    <div className="col-lg-8 col-xlg-6 col-md-8 ">
                                        <div className="card background-cv">
                                            <div className="card-body">
                                                <center className="m-t-10">
                                                    <img className="img-circle" src={"http://localhost:8888/backend-web/public" + avatarCV} width={150} />
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
                        {
                            userData.role === 2 && <div className="tab-pane" id="offer" role="tabpanel">
                                <div className="card-body">
                                    <div className="form-group">
                                        <label className="col-md-12">Lời nhắn :</label>
                                        <div className="col-md-12">
                                            <input className="form-control form-control-line" onChange={handleChange} name="message" value={message} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-12">Yêu cầu công việc :</label>
                                        <div className="d-flex justify-content-center">
                                            <div className="col-md-6">
                                                <input type="file" id="input-file-now" className="dropify" onChange={handleChangeFile} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group text-center">
                                        <div className="col-sm-12">
                                            <button type="button" className="btn btn-info" onClick={sendOffer}>
                                                Gửi
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
            {loadingOverlay && <LoadingOverlay />}
        </div>
    );
}
export default Information;