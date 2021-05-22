import React from "react";
import { Button, Modal } from "reactstrap";
import "../../assets/scss/common/modal.scss";

function ModalFail(props){
    return(
        <>
            <Modal 
            isOpen={props.modal}
            className="modal-fail">
                <div className="text-center">
                    Đã có lỗi sảy ra vui lòng thử lại sau !
                </div>

                <div className="text-center box-modal-action">
                    <Button onClick={props.toggle} className="btn btn-danger">Đóng</Button>
                </div>
            </Modal>
        </>
    );
}
export default ModalFail;