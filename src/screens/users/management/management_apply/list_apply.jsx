import React, { useEffect, useState } from 'react';
import Constants from '../../../../constants/constants';
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import { queryString } from '../../../../helpers/helpers';
import applyApi from '../../../../api/user/applyApi';
import ModalConfirmApplyCV from './modal_confirm_apply_cv';

function ListApply(props) {
    const parameters = {
        organization_id: queryString('organization_id'),
        job_id: queryString('job_id'),
    }
    const [apply, setApply] = useState({});
    const [renderTable, setRenderTable] = useState();
    const [limit, setLimit] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [flagStatus, setFlagStatus] = useState(null);
    const [applyId, setApplyId] = useState();
    const [text, setText] = useState();

    const listApply = (parameters) => {
        applyApi.getApply({
            organization_id:parameters.organization_id,
            job_id:parameters.job_id
        }).then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status = Constants.HTTP_STATUS.OK) {
                    const slice = response.data.applies.slice(page - 1, page - 1 + limit);
                    setApply(slice);
                    setPageCount(Math.ceil(response.data.applies.length / limit))
                }
            }
        }, (error) => {

        });
    }

    useEffect(() => {
        listApply(parameters);
    }, [page,limit])
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setPage(selectedPage + 1)
    };
    const changeLimit = (e) =>{
        const limit = +e.target.value;
        setLimit(limit);
    }
    useEffect(() => {
        if (apply.length > 0) {
            setRenderTable(apply.map(item => (
                <tr key={item.id}>
                    <td>{apply.indexOf(item) + 1}</td>
                    <td>{item.fullname}</td>
                    <td><Link><img src={"http://localhost:8888/backend-web/public" +(item.image ? item.image : '/local/default.png')} alt="organization" className="thumb-md round-img"/></Link></td>
                    <td>{item.position}</td>
                    <td>
                    {
                        item.status === 1 && <label htmlFor="jobStatus" className="btn btn-sm btn-success btn-status" data-id={item.id} data-status={item.status} onClick={toggleModalConfirmApplyCV}><i className="fa fa-check-circle"></i> Xác nhận</label>
                    }
                    {
                        item.status === 0 && <label htmlFor="jobStatus" className="btn btn-sm btn-danger btn-status" data-id={item.id} data-status={item.status} onClick={toggleModalConfirmApplyCV}><i className="fa fa-ban"></i> Chờ</label>
                    }
                    </td>
                </tr>
            )));
        }
    }, [apply]);
    useEffect(() => {
        listApply(parameters);
    }, []);
    const [modalConfirmApplyCV, setModalConfirmApplyCV] = useState(false);
    const toggleModalConfirmApplyCV = (e) => {
        const applyId = e.target.dataset.id;
        const status = e.target.dataset.status;
        if(status === '0'){
            setText("Bạn có chắc muốn xác nhận CV này");
            setFlagStatus(1);
        }
        else{
            setText("Bạn có chắc muốn hủy xác nhận CV này");
            setFlagStatus(0);
        }
        setApplyId(+applyId);
        setModalConfirmApplyCV(!modalConfirmApplyCV);
    };
    return (
        <>
            <h4 className="card-title">Danh sách ứng viên</h4>
            <div style={{width:'200px'}}>
                <select className="form-control" onChange={changeLimit} value={limit}>
                    <option value={1}>10</option>
                    <option value={2}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
            <div className="table-responsive m-t-10">
                <table className="table table-bordered table-striped text-center table-management">
                    <thead>
                        <tr className="text-center">
                            <th className="cell-click">STT</th>
                            <th className="cell-click">Ứng viên</th>
                            <th className="cell-click">Ảnh</th>
                            <th className="cell-click">Vị trí</th>
                            <th className="cell-click">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderTable}
                    </tbody>
                </table>
                {pageCount > 1 && <div className="d-flex justify-content-center">
                <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />
                </div> }
            </div>
            <ModalConfirmApplyCV
            modal={modalConfirmApplyCV}
            toggle={toggleModalConfirmApplyCV}
            id={applyId}
            text={text}
            flag={flagStatus}/>
        </>
    );
}
export default ListApply;