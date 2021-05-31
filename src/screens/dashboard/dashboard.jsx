import React, { useEffect } from 'react';
import MainLayout from '../layouts/main_layout';
import DashboardCategory from './dashboard_category';
import DashboardTopJob from './dashboard_top_job';

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
                            <img src="./assets/images/background/h1_hero.jpg" alt="" />
                            <div className="card-body">
                                <DashboardCategory />

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