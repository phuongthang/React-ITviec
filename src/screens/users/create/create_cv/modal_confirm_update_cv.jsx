import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import cvApi from "../../../../api/user/cvApi";
import "../../../../assets/scss/common/modal.scss";
import Constants from "../../../../constants/constants";
import ModalFail from "../../../modal/modal_fail";
import ModalSuccess from "../../../modal/modal_success";

function ModalConfirmUpdateCV(props) {
    const id = localStorage.getItem('id');
    const flag = props.flag;
    const [isSubmit, setIsSubmit] = useState(false);
    const onSubmit = (e) => {
        setIsSubmit(true);
    }
    const [modalSuccess, setModalSuccess] = useState(false);
    const toggleModalSuccess = () => {
        setModalSuccess(!modalSuccess);
    };
    const [modalFail, setModalFail] = useState(false);
    const toggleModalFail = () => {
        setModalFail(!modalFail);
    };
    useEffect(() => {
        if (isSubmit) {
                const form = new FormData();
                form.append("id", id);
                form.append("fullname", props.data.fullname);
                form.append("email", props.data.email);
                form.append("phone", props.data.phone);
                form.append("address", props.data.address );
                form.append("description", props.data.description);
                form.append('position', props.data.position);
                if(flag === true){
                    form.append("image", props.data.image);
                }
                cvApi.updateCV(form).then((response)=>{
                    console.log(props.data);
                    let mounted = true;
                    if(mounted){
                        if(response.status === Constants.HTTP_STATUS.OK){
                            console.log(response);
                            toggleModalSuccess();
                        }
                    }
                    return () => mounted = false;
                },(error)=>{
                    let mounted = true;
                    if(mounted){
                        console.log("fail");
                        toggleModalFail();
                    }
                    return ()=> mounted = false;
                }); 
        }
    }, [isSubmit]);
    return (
        <>
            <Modal
                isOpen={props.modal}
                className="modal-confirm-update-cv">
                <div className="text-center">
                    Bạn có chắc muốn cập nhật lại CV không ??
                </div>

                <div className="text-center box-modal-action">
                    <button type="button" onClick={onSubmit} className="btn btn-info">Đồng ý</button>
                    <button type="button" className="btn btn-danger" onClick={props.toggle}>Hủy</button>
                </div>
                <ModalSuccess toggle={toggleModalSuccess} modal={modalSuccess} text="Cập nhật thành công !" />
                <ModalFail toggle={toggleModalFail} modal={modalFail} />
            </Modal>
        </>
    );
}
export default ModalConfirmUpdateCV;