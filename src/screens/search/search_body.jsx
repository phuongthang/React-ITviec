import React, { useEffect, useState } from 'react';
import ExperienceApi from '../../api/common/experienceApi';
import LanguageApi from '../../api/common/languageApi';
import TypeApi from '../../api/common/typeApi';
import ProvinceApi from '../../api/address/getProvinceApi';
import Constants from '../../constants/constants';
import jobApi from '../../api/organization/jobApi';
import { convertDate, convertExperience, convertType } from '../../helpers/helpers';
import { Link } from 'react-router-dom';
import LoadingOverlay from '../loading/loading_overlay';
import ReactPaginate from 'react-paginate';

function SearchBody(props) {
    const [renderProvince, setRenderProvince] = useState();
    const [renderLanguage, setRenderLanguage] = useState();
    const [renderExperience, setRenderExperience] = useState();
    const [renderType, setRenderType] = useState();
    const [loadingOverlay, setLoadingOverlay] = useState(false);
    const defaultQuery = {
        title : '',
        type : '0',
        language : '0',
        experience : '0',
        province : '0',
        salary : '0',
    }
    const [limit, setLimit] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    useEffect(() => {
        queryJob(parameterQuery);
    }, [page, limit])
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setPage(selectedPage + 1)
    };
    const [parameterQuery, setParameterQuery] = useState(defaultQuery);
    const getProvinceApi = () => {
        ProvinceApi.getProvinceApi().then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                setRenderProvince(response.data.province.map(item => (
                    <option key={item.id} value={item.id}>{item._name}</option>
                )));
            }
        }, (error) => {
            props.history.push(Constants.LINK_URL.ERROR);
        });
    }

    const getLanguageApi = () => {
        LanguageApi.getLanguageApi().then((response) => {
            if (response.status === Constants.HTTP_STATUS.OK) {
                setRenderLanguage(response.data.languages.map(item => (
                    <option key={item.id} value={item.id}>{item.language}</option>
                )));
            }
        }, (error) => {
            props.history.push(Constants.LINK_URL.ERROR);
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
            props.history.push(Constants.LINK_URL.ERROR);
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
            props.history.push(Constants.LINK_URL.ERROR);
        });
    }
    const [renderQueryJob, setRenderQueryJob] = useState();
    const queryJob = (parameterQuery) => {
        jobApi.queryJob(parameterQuery).then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status = Constants.HTTP_STATUS.OK && response.data.jobs.length > 0) {
                    const slice = response.data.jobs.slice(page - 1, page - 1 + limit);
                    setPageCount(Math.ceil(response.data.jobs.length / limit));
                    setRenderQueryJob(slice.map(item => (
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
                else{
                    const arrRender = [];
                    arrRender.push(<div className="text-center">Không tìm thấy công việc phù hợp vui lòng thử lại !</div>)
                    setRenderQueryJob(arrRender);
                    setPageCount(1);
                }
            }
            setLoadingOverlay(false);
        }, (error) => {
            setLoadingOverlay(false);
            props.history.push(Constants.LINK_URL.ERROR);
        });
    }
    const handelChangeQuery = (e) =>{
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setParameterQuery((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue,
        }));
    }
    const onSearch = () =>{
        setLoadingOverlay(true);
        queryJob(parameterQuery);
        setPageCount(1);
        setPage(1);
    }
    const onRefresh = () => {
        setLoadingOverlay(true);
        setParameterQuery((prevState) => ({
            ...prevState,
            title : '',
            type : '0',
            language : '0',
            experience : '0',
            province : '0',
            salary : '0',
        }));
        setPageCount(1);
        setPage(1);
        queryJob(defaultQuery);
    }
    useEffect(() => {
        getExperienceApi();
        getLanguageApi();
        getTypeApi();
        getProvinceApi();
        queryJob(defaultQuery);
    }, []);
    return (
        <>
            <div className="row mt-5">
                <div className="col-lg-4 col-xlg-3">
                    <div className="left-search pt-5 pb-5 pl-5 pr-5">
                        <div className="mb-3 text-center">
                            <h4>Phân loại</h4>
                        </div>
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="">Lĩnh vực</label>
                                <input type="text" className="form-control" name="field" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="">Tên công việc</label>
                                <input type="text" className="form-control" name="title" onChange={handelChangeQuery} value={parameterQuery.title} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="">Loại công việc</label>
                                <div className="form-group">
                                    <select name="type" className="form-control" onChange={handelChangeQuery} value={parameterQuery.type}>
                                        <option value="0">Tất cả</option>
                                        {renderType}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="">Vị trí</label>
                                <div className="form-group">
                                    <select name="province" className="form-control" onChange={handelChangeQuery} value={parameterQuery.province}>
                                        <option value="0">Tất cả</option>
                                        {renderProvince}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="">Kinh nghiệm</label>
                                <div className="form-group">
                                    <select name="experience" className="form-control" onChange={handelChangeQuery} value={parameterQuery.experience}>
                                        <option value="0">Tất cả</option>
                                        {renderExperience}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="">Ngôn ngữ</label>
                                <div className="form-group">
                                    <select name="language" className="form-control" onChange={handelChangeQuery} value={parameterQuery.language}>
                                        <option value="0">Tất cả</option>
                                        {renderLanguage}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-group">
                                <label htmlFor="">Lương</label>
                                <div className="form-group">
                                    <select name="salary" className="form-control" onChange={handelChangeQuery} value={parameterQuery.salary}>
                                        <option value="0">Tất cả</option>
                                        <option value="1-500">{" < 500$ "}</option>
                                        <option value="500-1000">{" 500$ - 1000$ "}</option>
                                        <option value="1000-1500">{" 1000$ - 1500$ "}</option>
                                        <option value="1500-2000">{" 1500$ - 2000$ "}</option>
                                        <option value="2000-999999">{" > 2000$ "}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-sm btn-secondary" onClick={onSearch}>Tìm kiếm</button>
                            <button className="btn btn-sm btn-secondary" onClick={onRefresh}>Làm mới</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-xlg-9">
                    {renderQueryJob}
                </div>
            </div>
            {pageCount > 1 && <div className="d-flex justify-content-center">
                <ReactPaginate
                    previousLabel={""}
                    nextLabel={""}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div>}
            {loadingOverlay && <LoadingOverlay/>}
        </>
    );
}
export default SearchBody;