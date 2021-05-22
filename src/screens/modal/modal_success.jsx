import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "reactstrap";
import "../../assets/scss/common/modal.scss";
import Constants from "../../constants/constants";

function ModalSuccess(props){
    return(
        <>
            <Modal 
            isOpen={props.modal}
            className="modal-success">
                <div className="text-center">
                    {props.text}
                </div>

                <div className="text-center box-modal-action">
                    <Link to={Constants.LINK_URL.DASHBOARD} className="btn btn-info">OK</Link>
                </div>
            </Modal>
        </>
    );
}
export default ModalSuccess;