import React from "react";
import { Button, Modal } from "reactstrap";
import "../../assets/scss/common/modal.scss";

function ModalLoginFail(props){
    return(
        <>
            <Modal 
            isOpen={props.modal}
            className="modal-fail">
                <div className="text-center m-l-10 m-r-10">
                    {props.text}
                </div>

                <div className="text-center box-modal-action">
                    <Button onClick={props.toggle} className="btn btn-danger">Đóng</Button>
                </div>
            </Modal>
        </>
    );
}
export default ModalLoginFail;