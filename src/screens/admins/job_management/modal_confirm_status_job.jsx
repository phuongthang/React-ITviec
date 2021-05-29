import React, { useEffect, useState } from "react";
import { Modal,Button } from "reactstrap";
import managementApi from "../../../api/admin/managementApi";
import "../../../assets/scss/common/modal.scss";
import Constants from "../../../constants/constants";
import ModalFail from "../../modal/modal_fail";
import ModalSuccessReload from "../../modal/modal_success_reload";

function ModalConfirmActiveStatusJob(props){
    const [modalSuccessReload, setModalSuccessReload] = useState(false);
    const toggleModalSuccessReload = () => {
        setModalSuccessReload(!modalSuccessReload);
    };
    const [modalFail, setModalFail] = useState(false);
    const toggleModalFail = () => {
        setModalFail(!modalFail);
    };
    const [text, setText] = useState();
    const activeStatusJob = (id,flag) => {
        console.log(flag);
        managementApi.activeStatusJob({
            id:id,
            flag:flag
        }).then((response)=>{
            let mounted = true;
            if(mounted){
                if(response.status === Constants.HTTP_STATUS.OK){
                    if(flag === 0){
                        setText("Hủy kích hoạt thành công !");
                    }
                    else{
                        setText("Kích hoạt thành công !")
                    }
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
            className="modal-active">
                <div className="text-center">
                    {props.text}
                </div>

                <div className="text-center box-modal-action">
                    <Button type="button" className="btn btn-info" onClick={()=>activeStatusJob(props.id,props.flag)}>OK</Button>
                    <Button type="button" className="btn btn-danger" onClick={props.toggle}>Hủy</Button>
                </div>
            </Modal>
            <ModalSuccessReload toggle={toggleModalSuccessReload} modal={modalSuccessReload} text={text} />
            <ModalFail toggle={toggleModalFail} modal={modalFail} />
        </>
    );
}
export default ModalConfirmActiveStatusJob;