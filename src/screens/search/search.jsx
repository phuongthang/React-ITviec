import React, { useEffect } from 'react';
import MainLayout from '../layouts/main_layout';
import SearchBody from './search_body';

function Search(props) {
    useEffect(() => {
        document.title = "Tìm kiếm";
    }, []);
    return (
        <MainLayout>
            <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                    <h3 className="text-themecolor">Tìm kiếm</h3>
                </div>
                <div className="col-md-7 align-self-center">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Trang chủ</a></li>
                        <li className="breadcrumb-item">Công việc</li>
                        <li className="breadcrumb-item active">Tìm kiếm</li>
                    </ol>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <img src="./assets/images/background/h1_hero.jpg" alt="" />
                            <div className="card-body">
                                <div className="text-center">
                                    <h2>Tìm Kiếm Công Việc</h2>
                                    <div className=" text-center line"></div>
                                </div>
                                <SearchBody/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
export default Search;