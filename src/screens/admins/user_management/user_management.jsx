import React, { useEffect } from 'react';
import MainLayout from '../../layouts/main_layout';
import ListUser from './list_user';

function UserManagement(props) {
    useEffect(() => {
        document.title = "Quản Lí";
    }, []);
    return (
        <MainLayout>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h3 className="text-themecolor">Quản Lí</h3>
                </div>
                <div className="col-md-7 align-self-center">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
                        <li className="breadcrumb-item">Cá nhân</li>
                        <li className="breadcrumb-item active">Quản lí</li>
                    </ol>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <ListUser/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
export default UserManagement;