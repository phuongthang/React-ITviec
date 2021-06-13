import React, { useEffect, useState } from 'react';
import ProvinceApi from '../../api/address/getProvinceApi';
import Constants from '../../constants/constants';
import { convertDate} from '../../helpers/helpers';
import { Link } from 'react-router-dom';
import LoadingOverlay from '../loading/loading_overlay';
import ReactPaginate from 'react-paginate';
import cvApi from '../../api/user/cvApi';

function SearchOffer(props) {
    const [renderProvince, setRenderProvince] = useState();
    const [loadingOverlay, setLoadingOverlay] = useState(false);
    const defaultQuery = {
        title : '',
        province : '0',
    }
    const [limit, setLimit] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    useEffect(() => {
        queryCV(parameterQuery);
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
                    <option key={item.id} value={item._name}>{item._name}</option>
                )));
            }
        }, (error) => {
            props.history.push(Constants.LINK_URL.ERROR);
        });
    }
    const [renderQueryCV, setRenderQueryCV] = useState();
    const queryCV = (parameterQuery) => {
        cvApi.queryCV(parameterQuery).then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status = Constants.HTTP_STATUS.OK && response.data.cvs.length > 0) {
                    const slice = response.data.cvs.slice(page - 1, page - 1 + limit);
                    setPageCount(Math.ceil(response.data.cvs.length / limit));
                    setRenderQueryCV(slice.map(item => (
                        <Link to={Constants.LINK_URL.USER_INFO + `?user_id=${item.user_id}`} className="col-md-12 col-lg-12 col-xlg-12" key={item.id}>
                            <div className="job-item mb-3">
                                <div className="card-body mb-30 d-flex justify-content-between">
                                    <div className="d-flex">
                                        <div className="m-l-20">
                                            <img src={"http://localhost:8888/backend-web/public/" + (item.image ? item.image : '/local/default.png')} alt="" className="img-circle img-responsive thumb-lg mb-3" alt="" />
                                        </div>
                                        <div className="m-l-20">
                                            <h4>{item.fullname}</h4>
                                            <div className="d-flex text-secondary mt-4">
                                                <p className="m-r-20 m-l-20"><i className="fa fa-grav text-info m-r-10"></i>Vị trí : {item.position}</p>
                                                <p className="m-r-20 m-l-20"><i className="fa fa-map-marker text-danger m-r-10"></i>Địa chỉ : {item.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center text-secondary">
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
                    setRenderQueryCV(arrRender);
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
        queryCV(parameterQuery);
        setPageCount(1);
        setPage(1);
    }
    const onRefresh = () => {
        setLoadingOverlay(true);
        setParameterQuery((prevState) => ({
            ...prevState,
            title : '',
            province : '0',
        }));
        setPageCount(1);
        setPage(1);
        queryCV(defaultQuery);
    }
    useEffect(() => {
        getProvinceApi();
        queryCV(defaultQuery);
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
                                <label htmlFor="">Tên công việc</label>
                                <input type="text" className="form-control" name="title" onChange={handelChangeQuery} value={parameterQuery.title} />
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
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-sm btn-secondary" onClick={onSearch}>Tìm kiếm</button>
                            <button className="btn btn-sm btn-secondary" onClick={onRefresh}>Làm mới</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-xlg-9">
                    {renderQueryCV}
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
export default SearchOffer;