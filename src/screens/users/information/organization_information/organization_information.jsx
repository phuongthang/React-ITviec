import React, { useEffect } from 'react';
import MainLayout from '../../../layouts/main_layout';
import Information from './information';

function OrganizationInformation(props) {
    useEffect(() => {
        document.title = "Thông tin cá nhân";
    }, []);
    return (
        <MainLayout>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h3 className="text-themecolor">Thông tin tổ chức</h3>
                </div>
                <div className="col-md-7 align-self-center">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
                        <li className="breadcrumb-item">Tổ chức</li>
                        <li className="breadcrumb-item active">Thông tin tổ chức</li>
                    </ol>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <Information/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
export default OrganizationInformation;