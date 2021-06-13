import { useEffect, useState } from "react";
import applyApi from "../../../../api/user/applyApi";
import profileUserApi from "../../../../api/user/profileApi";
import Constants from "../../../../constants/constants";
import { getInfoUserLogin, queryString } from "../../../../helpers/helpers";
import ModalFail from "../../../modal/modal_fail";
import ModalSuccess from "../../../modal/modal_success";

function Apply(props) {
    const userData = getInfoUserLogin();
    const parameters = {
        user_id : userData.id,
        organization_id : queryString('organization_id'),
        job_id : queryString('job_id')
    }
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
    const [flag, setFlag] = useState(false);
    const [apply, setApply] = useState({
        email: '',
        image: '',
    })
    const handleChange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setApply((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue,
        }));
    }
    const handleChangeFile = (e) => {
        setApply((prevState) => ({
            ...prevState,
            image: e.target.files[0],
        }));
        setFlag(true);
    }
    useEffect(() => {
        profileUserApi.getProfile({
            id: parameters.user_id,
        }).then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setUser(response.data.user);
                    setApply((prevState) => ({
                        ...prevState,
                        email: response.data.user.email,
                    }));
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
    }, []);

    const applyJob = (parameters) => {
        const form = new FormData();
        form.append("user_id", parameters.user_id);
        form.append("organization_id", parameters.organization_id);
        form.append("job_id", parameters.job_id);
        form.append("email", apply.email);
        if (flag) {
            form.append("image", apply.image);
        }
        applyApi.createApply(form).then((response)=>{
            let mounted = true;
            if (mounted) {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    toggleModalSuccess();
                }
            }
            return () => mounted = false;
        },(error)=>{
            let mounted = true;
            if (mounted) {
                    toggleModalFail();
            }
            return () => mounted = false;
        });
    }
    const onSubmits = () => {
        applyJob(parameters);

    }
    const [modalSuccess, setModalSuccess] = useState(false);
    const toggleModalSuccess = () => {
        setModalSuccess(!modalSuccess);
    };
    const [modalFail, setModalFail] = useState(false);
    const toggleModalFail = () => {
        setModalFail(!modalFail);
    };
    return (
        <form className="form-horizontal form-material">
            <div className="form-group">
                <label className="col-md-12">Họ và tên :</label>
                <div className="col-md-12">
                    <input className="form-control form-control-line" defaultValue={user.fullname} name="fullname" readOnly={true} />
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-12">Vị trí :</label>
                <div className="col-md-12">
                    <input className="form-control form-control-line" defaultValue={user.position} name="position" readOnly={true} />
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-12">Email :</label>
                <div className="col-md-12">
                    <input className="form-control form-control-line" defaultValue={user.email} name="email" required onChange={handleChange} />
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-12">Số điện thoại :</label>
                <div className="col-md-12">
                    <input className="form-control form-control-line" defaultValue={user.phone} name="phone" readOnly={true} />
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-12">Địa chỉ :</label>
                <div className="col-md-12">
                    <input className="form-control form-control-line" defaultValue={user.address} name="address" readOnly={true} />
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-12">Tải CV :</label>
                <div className="col-md-12">
                    <br />
                    <input type="file" onChange={handleChangeFile} />
                </div>
            </div>
            <div className="form-group text-center">
                <div className="col-sm-12">
                    <button type="button" className="btn btn-info" onClick={()=>onSubmits()}>
                        Cập nhật
                    </button>
                </div>
            </div>
            <ModalSuccess toggle={toggleModalSuccess} modal={modalSuccess} text="Chúc mừng bạn đã ứng tuyển thành công, chờ xác nhận từ doanh nghiệp nhé !" />
            <ModalFail toggle={toggleModalFail} modal={modalFail} />
        </form>
    );
}
export default Apply;