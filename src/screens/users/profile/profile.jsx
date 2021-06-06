import React, { useEffect } from 'react';
import Constants from '../../../constants/constants';
import { getInfoUserLogin } from '../../../helpers/helpers';
import MainLayout from "../../layouts/main_layout";
import ProfileAdmin from './profile_admin';
import ProfileOrganization from './profile_organization';
import ProfileUser from './profile_user';

function Profile(props) {
    useEffect(() => {
        document.title = "Thông tin cá nhân";
    }, []);
    const userData = getInfoUserLogin();
    return (
        <MainLayout>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h3>Thông tin cá nhân</h3>
                </div>
                <div className="col-md-7 align-self-center">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                        <li className="breadcrumb-item">Tài khoản</li>
                        <li className="breadcrumb-item active">Thông tin cá nhân</li>
                    </ol>
                </div>
            </div>
            <div className="container-fluid">
                {
                    userData.role === Constants.ROLE.ADMIN && <ProfileAdmin/>
                }
                {
                    userData.role === Constants.ROLE.USER && <ProfileUser/>
                }
                {
                    userData.role === Constants.ROLE.ORGANIZATION && <ProfileOrganization/>
                }
            </div>
        </MainLayout>
    );
}
export default Profile;