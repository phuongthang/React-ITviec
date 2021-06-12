import React, { useEffect, useState } from 'react';
import managementApi from '../../../api/admin/managementApi';
import Constants from '../../../constants/constants';
import ReactPaginate from 'react-paginate';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import ModalConfirmActiveCV from './modal_confirm_active_cv';
import ModalConfirmDeleteCV from './modal_confirm_delete_cv';

function ListCV(props) {
    const [cv, setCV] = useState({});
    const [renderTable, setRenderTable] = useState();
    const [cvId, setCVId] = useState();
    const [limit, setLimit] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [text, setText] = useState();
    const [flagActive, setFlagActive] = useState(null);

    const listCV = () => {
        managementApi.getCV().then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status = Constants.HTTP_STATUS.OK) {
                    const slice = response.data.cvs.slice(page - 1, page - 1 + limit);
                    setCV(slice);
                    setPageCount(Math.ceil(response.data.cvs.length / limit))
                }
            }
        }, (error) => {

        });
    }

    useEffect(() => {
        listCV();
    }, [page,limit])
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setPage(selectedPage + 1)
    };
    const changeLimit = (e) =>{
        const limit = +e.target.value;
        setLimit(limit);
    }
    const [modalConfirmDeleteCV, setModalConfirmDeleteCV] = useState(false);
    const toggleModalConfirmDeleteCV = (e) => {
        const cvId = e.target.dataset.id;
        setCVId(cvId);
        setModalConfirmDeleteCV(!modalConfirmDeleteCV);
    };
    const [modalConfirmActiveCV, setModalConfirmActiveCV] = useState(false);
    const toggleModalConfirmActiveCV = (e) => {
        const cvId = e.target.dataset.id;
        const active = e.target.dataset.active;
        if(active === '0'){
            setText("Bạn có chắc muốn ghim bài viết này");
            setFlagActive(1);
        }
        else{
            setText("Bạn có chắc muốn hủy ghim bài viết này");
            setFlagActive(0);
        }
        setCVId(+cvId);
        setModalConfirmActiveCV(!modalConfirmActiveCV);
    };
    useEffect(() => {
        if (cv.length > 0) {
            setRenderTable(cv.map(item => (
                <tr key={item.id}>
                    <td>{cv.indexOf(item) + 1}</td>
                    <td><Link className="text-secondary" to={`${Constants.LINK_URL.USER_INFO}?user_id=${item.user_id}`} >{item.fullname}</Link></td>
                    <td><Link className="text-secondary" to={`${Constants.LINK_URL.USER_INFO}?user_id=${item.user_id}`}><img src={"http://localhost:8888/backend-web/public" +(item.image ? item.image : '/local/default.png')} alt="organization" className="thumb-md round-img"/> </Link></td>
                    <td>
                    {
                        item.active === 1 && <Button className="btn btn-sm btn-success btn-status" data-id={item.id} data-active={item.active} onClick={toggleModalConfirmActiveCV} ><i className="fa fa-check-circle"></i> Có</Button>
                    }
                    {
                        item.active === 0 && <Button className="btn btn-sm btn-danger btn-status" data-id={item.id} data-active={item.active} onClick={toggleModalConfirmActiveCV} ><i className="fa fa-ban"></i> Không</Button>
                    }
                    </td>
                    <td><Link className="text-secondary" to={`${Constants.LINK_URL.USER_INFO}?user_id=${item.user_id}`}><i className="fa fa-info m-r-5 text-info cell-click font-20"></i></Link> <i className="fa fa-minus-circle m-l-5 text-danger cell-click font-20" data-id={item.id} onClick={toggleModalConfirmDeleteCV}></i></td>
                </tr>
            )));
        }
    }, [cv]);
    useEffect(() => {
        listCV();
    }, []);
    return (
        <>
            <h4 className="card-title">Danh sách CV</h4>
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
                            <th className="cell-click">Họ tên</th>
                            <th className="cell-click">Ảnh</th>
                            <th className="cell-click">Trạng thái</th>
                            <th className="cell-click">Hành động</th>
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
            <ModalConfirmDeleteCV
            modal={modalConfirmDeleteCV}
            toggle={toggleModalConfirmDeleteCV}
            id={cvId}/>
            <ModalConfirmActiveCV
            modal={modalConfirmActiveCV}
            toggle={toggleModalConfirmActiveCV}
            id={cvId}
            text={text}
            flag={flagActive}/>
        </>
    );
}
export default ListCV;