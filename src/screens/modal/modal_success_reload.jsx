import React from "react";
import { Button, Modal } from "reactstrap";
import "../../assets/scss/common/modal.scss";

function ModalSuccessReload(props){
    const reload = () =>{
        window.location.reload();
    }
    return(
        <>
            <Modal 
            isOpen={props.modal}
            className="modal-success">
                <div className="text-center">
                    {props.text}
                </div>

                <div className="text-center box-modal-action">
                    <Button className="btn btn-info" onClick={reload}>OK</Button>
                </div>
            </Modal>
        </>
    );
}
export default ModalSuccessReload;