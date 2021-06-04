import React, { useEffect, useState } from 'react';
import ExperienceApi from '../../api/common/experienceApi';
import LanguageApi from '../../api/common/languageApi';
import TypeApi from '../../api/common/typeApi';
import ProvinceApi from '../../api/address/getProvinceApi';
import Constants from '../../constants/constants';
import jobApi from '../../api/organization/jobApi';
import { convertDate, convertExperience, convertType } from '../../helpers/helpers';
import { Link } from 'react-router-dom';

function SearchBody(props) {
    const [renderProvince, setRenderProvince] = useState();
    const [renderLanguage, setRenderLanguage] = useState();
    const [renderExperience, setRenderExperience] = useState();
    const [renderType, setRenderType] = useState();
    const getProvinceApi = () => {
        ProvinceApi.getProvinceApi().then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                setRenderProvince(response.data.province.map(item => (
                    <option key={item.id} value={item.id}>{item._name}</option>
                )));
            }
        }, (error) => {
            console.log("Fail");
        });
    }

    const getLanguageApi = () => {
        LanguageApi  .getLanguageApi().then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                setRenderLanguage(response.data.languages.map(item => (
                    <option key={item.id} value={item.id}>{item.language}</option>
                )));
            }
        }, (error) => {
            console.log("Error");
        });
    }

    const getExperienceApi = () => {
        ExperienceApi.getExperienceApi().then((response) => {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setRenderExperience(response.data.experiences.map(item => (
                        <option key={item.id} value={item.id}>{item.experience}</option>
                    )));
                }
        }, (error) => {
            console.log("Error");
        });
    }
    const getTypeApi = () => {
        TypeApi.getTypeApi().then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                setRenderType(response.data.types.map(item => (
                    <option key={item.id} value={item.id}>{item.type}</option>
                )));
            }
        }, (error) => {
            console.log("Error");
        });
    }
    const [renderQueryJob, setRenderQueryJob] = useState();
    const queryJob = () => {
        jobApi.queryJob().then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status = Constants.HTTP_STATUS.OK && response.data.jobs.length > 0) {
                    setRenderQueryJob(response.data.jobs.map(item => (
                        <Link to={Constants.LINK_URL.JOB_INFO + `?organization_id=${item.organization_id}&job_id=${item.id}`} className="col-md-12 col-lg-12 col-xlg-12" key={item.id}>
                            <div className="job-item mb-3">
                                <div className="card-body mb-30 d-flex justify-content-between">
                                    <div className="d-flex">
                                        <div className="m-l-20">
                                            <img src={"http://localhost:8888/backend-web/public/" + (item.image ? item.image : '/local/default.png')} alt="" className="img-circle img-responsive thumb-lg mb-3" alt="" />
                                        </div>
                                        <div className="m-l-20">
                                            <h4>{item.title}</h4>
                                            <div className="d-flex text-secondary mt-4">
                                                <p className="m-r-20 m-l-20"><i className="fa fa-grav text-info m-r-10"></i>Trình độ : {convertExperience(item.experience_id)}</p>
                                                <p className="m-r-20 m-l-20"><i className="fa fa-map-marker text-danger m-r-10"></i>Vị trí : {item.location}</p>
                                                <p className="m-r-20 m-l-20"><i className="fa fa-bitcoin text-success m-r-10"></i>Lương: {item.salary}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center text-secondary">
                                        <button className="btn btn-sm btn-danger btn-status">{convertType(item.type_id)}</button>
                                        <div className="mt-3">Ngày tạo : {convertDate(item.created_at)}</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )));
                }
            }
        }, (error) => {

        });
    }
    useEffect(() => {
        getExperienceApi();
        getLanguageApi();
        getTypeApi();
        getProvinceApi();
        queryJob();
    }, []);
    return (
        <>
            <div className="row mt-5">
                <div className="col-lg-3">
                    <div className="left-search pt-5 pb-5 pl-5 pr-5">
                        <div className="mb-3 text-center">
                            <h4>Phân loại</h4>
                        </div>
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="">Tên công việc</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="">Loại công việc</label>
                                <div className="form-group">
                                    <select name="select" className="form-control">
                                        <option value="">Tất cả</option>
                                        {renderType}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="">Vị trí</label>
                                <div className="form-group">
                                    <select name="select" className="form-control">
                                        <option value="">Tất cả</option>
                                        {renderProvince}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="">Kinh nghiệm</label>
                                <div className="form-group">
                                    <select name="select" className="form-control">
                                        <option value="">Tất cả</option>
                                        {renderExperience}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="">Ngôn ngữ</label>
                                <div className="form-group">
                                    <select name="select" className="form-control">
                                        <option value="">Tất cả</option>
                                        {renderLanguage}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="">Lương</label>
                                <div className="form-group">
                                    <select name="select" className="form-control">
                                        <option value="">Tất cả</option>
                                        <option value="">{" < 500$ "}</option>
                                        <option value="">{" 500$ - 1000$ "}</option>
                                        <option value="">{" 1000$ - 1500$ "}</option>
                                        <option value="">{" 1500$ - 2000$ "}</option>
                                        <option value="">{" > 2000$ "}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-secondary">Tìm kiếm</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">
                    {renderQueryJob}
                </div>
            </div>
        </>
    );
}
export default SearchBody;