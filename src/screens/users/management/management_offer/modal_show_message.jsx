import React, { useState } from "react";
import { Modal,Button } from "reactstrap";

function ModalShowMessage(props){
    const {message} = props;
    return(
        <>
            <Modal 
            isOpen={props.modal}
            className="modal-confirm">
                <div className="text-center">
                    {message?message:'Không có thông báo !'}
                </div>

                <div className="text-center box-modal-action">
                    <Button type="button" className="btn btn-info" onClick={props.toggle}>OK</Button>
                </div>
            </Modal>
        </>
    );
}
export default ModalShowMessage;