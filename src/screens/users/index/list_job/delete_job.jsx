import React from "react";
import { Button, Modal } from "reactstrap";
import "../../../../assets/scss/common/modal.scss";

function ModalDeleteJob(props){
    return(
        <>
            <Modal 
            isOpen={props.modal}
            toggle={props.toggle}
            className="modal-delete">
                <div className="text-center">
                    Bạn có chắc muốn xóa bài viết này không ??
                </div>

                <div className="text-center box-modal-action">
                    <Button className="btn btn-info">Đồng ý</Button>
                    <Button onClick={props.toggle} className="btn btn-danger">Đóng</Button>
                </div>
            </Modal>
        </>
    );
}
export default ModalDeleteJob;