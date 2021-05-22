import React, { useState } from "react";
import { Modal,Button } from "reactstrap";
import managementApi from "../../../api/admin/managementApi";
import "../../../assets/scss/common/modal.scss";
import Constants from "../../../constants/constants";
import ModalFail from "../../modal/modal_fail";
import ModalSuccessReload from "../../modal/modal_success_reload";

function ModalConfirmDeleteUser(props){
    const [modalSuccessReload, setModalSuccessReload] = useState(false);
    const toggleModalSuccessReload = () => {
        setModalSuccessReload(!modalSuccessReload);
    };
    const [modalFail, setModalFail] = useState(false);
    const toggleModalFail = () => {
        setModalFail(!modalFail);
    };

    const deleteUser = (id) => {
        managementApi.deleteUser({id:id}).then((response)=>{
            let mounted = true;
            if(mounted){
                if(response.status === Constants.HTTP_STATUS.OK){
                    toggleModalSuccessReload();
                }
            }
            return ()=> mounted = false;
            
        },(error)=>{
            let mounted = true;
            if(mounted){
                toggleModalFail();
            }
            return () => mounted = false;
        });
    }
    return(
        <>
            <Modal 
            isOpen={props.modal}
            className="modal-confirm">
                <div className="text-center">
                    Bạn có chắc muốn khóa tài khoản này không ??
                </div>

                <div className="text-center box-modal-action">
                    <Button type="button" className="btn btn-info" onClick={()=>deleteUser(props.id)}>OK</Button>
                    <Button type="button" className="btn btn-danger" onClick={props.toggle}>Hủy</Button>
                </div>
            </Modal>
            <ModalSuccessReload toggle={toggleModalSuccessReload} modal={modalSuccessReload} text={"Xóa thành công !"} />
            <ModalFail toggle={toggleModalFail} modal={modalFail} />
        </>
    );
}
export default ModalConfirmDeleteUser;