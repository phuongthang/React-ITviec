import React, { useEffect } from 'react';
import MainLayout from '../layouts/main_layout';
import DashboardTopJob from './dashboard_top_job';
import DashboardTopOrganization from './dashboard_top_organization';

function Dashboard(props) {
    useEffect(() => {
        document.title = "Trang chủ";
    }, []);
    return (
        <MainLayout>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h3 className="text-themecolor">Trang chủ</h3>
                </div>
                <div className="col-md-7 align-self-center">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
                        <li className="breadcrumb-item">Trang chủ</li>
                        <li className="breadcrumb-item active">Trang chủ</li>
                    </ol>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <DashboardTopOrganization />

                                <DashboardTopJob />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
export default Dashboard;