import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import profileAdminApi from "../../../api/admin/profileApi";
import profileOrganizationApi from "../../../api/organization/profileApi";
import profileUserApi from "../../../api/user/profileApi";
import "../../../assets/scss/common/modal.scss";
import Constants from "../../../constants/constants";
import { getInfoUserLogin } from "../../../helpers/helpers";
import LoadingOverlay from "../../loading/loading_overlay";

function ModalConfirmProfile(props) {
    const userData = getInfoUserLogin();
    const flag = props.flag;
    const [loadingOverlay, setLoadingOverlay] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const onSubmit = (e) => {
        setLoadingOverlay(true);
        setIsSubmit(true);
    }
    useEffect(() => {
        if (isSubmit) {
                const form = new FormData();
                form.append("id", userData.id);
                form.append("fullname", props.data.fullname);
                form.append("phone", props.data.phone);
                form.append("address", props.data.address );
                form.append("description", props.data.description);
                if(flag === 1){
                    form.append("image", props.data.image);
                }
            if (userData.role === Constants.ROLE.ADMIN) {
                form.append('position', props.data.position);
                profileAdminApi.postProfile(form).then((response) => {
                    let mounted = true;
                    if (mounted) {
                        if (response.status === Constants.HTTP_STATUS.OK) {
                            window.location.reload();
                        }
                    }
                    return () => mounted = false;
                }, (error) => {
                    let mounted = true;
                    if (mounted) {
                        if (error.response.status === Constants.HTTP_STATUS.UNAUTHORIZED) {
                            console.log("Fail");
                        }
    
                    }
                    setLoadingOverlay(false);
                    return () => mounted = false;
                });
            }
            else if (userData.role === Constants.ROLE.USER) {
                form.append('position', props.data.position);
                profileUserApi.postProfile(form).then((response) => {
                    let mounted = true;
                    if (mounted) {
                        if (response.status === Constants.HTTP_STATUS.OK) {
                            window.location.reload();
                        }
                    }
                    return () => mounted = false;
                }, (error) => {
                    let mounted = true;
                    if (mounted) {
                        if (error.response.status === Constants.HTTP_STATUS.UNAUTHORIZED) {
                            console.log("Fail");
                        }
    
                    }
                    setLoadingOverlay(false);
                    return () => mounted = false;
                });
            }
            if (userData.role === Constants.ROLE.ORGANIZATION) {
                form.append('field', props.data.field);
                form.append('establishment', props.data.establishment);
                profileOrganizationApi.postProfile(form).then((response) => {
                    let mounted = true;
                    if (mounted) {
                        if (response.status === Constants.HTTP_STATUS.OK) {
                            window.location.reload();
                        }
                    }
                    return () => mounted = false;
                }, (error) => {
                    let mounted = true;
                    if (mounted) {
                        if (error.response.status === Constants.HTTP_STATUS.UNAUTHORIZED) {
                            console.log("Fail");
                        }
    
                    }
                    setLoadingOverlay(false);
                    return () => mounted = false;
                });
            }
        }
    }, [isSubmit]);
    return (
        <>
            <Modal
                isOpen={props.modal}
                className="modal-confirm-profile">
                <div className="text-center">
                    Bạn có chắc muốn thực hiện không ??
                </div>

                <div className="text-center box-modal-action">
                    <button type="button" onClick={onSubmit} className="btn btn-info">Đồng ý</button>
                    <button type="button" className="btn btn-danger" onClick={props.toggle} >Hủy</button>
                </div>
                
            </Modal>
            {loadingOverlay && <LoadingOverlay/>}
        </>
    );
}
export default ModalConfirmProfile;