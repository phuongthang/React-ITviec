import { useEffect, useState } from "react";
import profileApi from "../../../api/organization/profileApi";
import Constants from "../../../constants/constants";
import { getInfoUserLogin } from "../../../helpers/helpers";
import ModalConfirmProfile from "./modal_confirm_profile";

function ProfileOrganization(props) {
    const userData = getInfoUserLogin();
    const [organization, setOrganization] = useState({
        username:'',
        fullname:'',
        email: '',
        phone:'',
        address:'',
        description:'',
        field:'',
        establishment:'',
    });
    const [avatar, setAvatar] = useState('/local/default.png');
    const [flag, setFlag] = useState(0);
    const handleChange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setOrganization((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue,
        }));
    }
    const handleChangeFile = (e) =>{
        setOrganization((prevState) => ({
            ...prevState,
            image: e.target.files[0],
        }));
        setFlag(1);
    }
    useEffect(() => {
            profileApi.getProfile({
                id:userData.id,
            }).then((response) => {
                let mounted = true;
                if (mounted) {
                    if (response.status === Constants.HTTP_STATUS.OK) {
                        setOrganization(response.data.organization);
                        setAvatar(response.data.organization.image?response.data.organization.image:'/local/default.png');
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
    }, []);
    const [modalConfirmProfile, setModalConfirmProfile] = useState(false);
    const toggleModalConfirmProfile = () => {
        setModalConfirmProfile(!modalConfirmProfile);
    };
    return (
        <div className="row">
            <div className="col-lg-4 col-xlg-3 col-md-5">
                <div className="card left-profile-organization">
                    <div className="card-body">
                        <center className="m-t-30">
                            <img className="img-circle" src={"http://localhost:8888/backend-web/public"+ avatar} width={150} />
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
                        <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#edit" role="tab">Chỉnh sửa</a> </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane active" id="profile" role="tabpanel">
                            <div className="card-body">
                                <p className="btn btn-danger">Mô tả :</p>
                                <p className="m-t-30"><label>{organization.description}</label></p>
                            </div>
                        </div>
                        <div className="tab-pane" id="edit" role="tabpanel">
                            <div className="card-body">
                                <form className="form-horizontal form-material">
                                    <div className="form-group">
                                        <label className="col-md-12">Công ty :</label>
                                        <div className="col-md-12">
                                            <input className="form-control form-control-line" defaultValue={organization.fullname}  name="fullname" onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-12">Lĩnh vực :</label>
                                        <div className="col-md-12">
                                            <input className="form-control form-control-line" defaultValue={organization.field} name="field" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-12">Ngày thành lập :</label>
                                        <div className="col-md-12">
                                            <input type="date" className="form-control form-control-line" defaultValue={organization.establishment} name="establishment" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-12">Địa chỉ :</label>
                                        <div className="col-md-12">
                                            <input className="form-control form-control-line" defaultValue={organization.address} name="address" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-12">Số điện thoại :</label>
                                        <div className="col-md-12">
                                            <input className="form-control form-control-line" defaultValue={organization.phone} name="phone" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-12">Mô tả :</label>
                                        <div className="col-md-12">
                                            <textarea rows={5} textmode="MultiLine" className="form-control form-control-line" defaultValue={organization.description} name="description" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-md-12">Ảnh :</label>
                                        <div className="d-flex justify-content-center">
                                            <div className="col-md-6">
                                                <input type="file" id="input-file-now" className="dropify" onChange={handleChangeFile} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group text-center">
                                        <div className="col-sm-12">
                                            <button type="button" className="btn btn-info" onClick={()=>toggleModalConfirmProfile()}>
                                                Cập nhật
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <ModalConfirmProfile
                                modal={modalConfirmProfile}
                                toggle={toggleModalConfirmProfile}
                                data = {organization}
                                flag = {flag}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProfileOrganization;