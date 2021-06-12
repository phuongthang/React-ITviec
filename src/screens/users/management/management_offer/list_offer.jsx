import React, { useEffect, useState } from 'react';
import Constants from '../../../../constants/constants';
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import { getInfoUserLogin } from '../../../../helpers/helpers';
import ModalConfirmDeleteOffer from './modal_confirm_delete_offer';
import managementApi from '../../../../api/admin/managementApi';
import pdf from "../../../../assets/image/pdf.png";
import ModalShowMessage from './modal_show_message';

function ListOffer(props) {
    const [offer, setOffer] = useState({});
    const [offerId, setOfferId] = useState();
    const [renderTable, setRenderTable] = useState();
    const [limit, setLimit] = useState(10);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const userData = getInfoUserLogin();
    const parameters = {
        user_id : userData.id,
    }

    const listOffer = () => {
        managementApi.getOffer({
            user_id: parameters.user_id
        }).then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status = Constants.HTTP_STATUS.OK) {
                    const slice = response.data.offers.slice(page - 1, page - 1 + limit);
                    setOffer(slice);
                    setPageCount(Math.ceil(response.data.offers.length / limit))
                }
            }
        }, (error) => {

        });
    }

    useEffect(() => {
        listOffer();
    }, [page,limit])
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setPage(selectedPage + 1)
    };
    const changeLimit = (e) =>{
        const limit = +e.target.value;
        setLimit(limit);
    }
    const [modalConfirmDeleteOffer, setModalConfirmDeleteOffer] = useState(false);
    const toggleModalConfirmDeleteOffer = (e) => {
        const offerId = e.target.dataset.id;
        setOfferId(offerId);
        setModalConfirmDeleteOffer(!modalConfirmDeleteOffer);
    };
    const [message, setMessage] = useState();
    const [modalShowMessage, setModalShowMessage] = useState(false);
    const toggleModalShowMessage = (e) => {
        const message = e.target.dataset.message;
        setMessage(message);
        setModalShowMessage(!modalShowMessage);
    };
    useEffect(() => {
        if (offer.length > 0) {
            setRenderTable(offer.map(item => (
                <tr key={item.id}>
                    <td>{offer.indexOf(item) + 1}</td>
                    <td><Link className="text-secondary" to={`${Constants.LINK_URL.ORGANIZATION_INFO}?organization_id=${item.organization_id}`} >{item.fullname}</Link></td>
                    <td><Link className="text-secondary" to={`${Constants.LINK_URL.ORGANIZATION_INFO}?organization_id=${item.organization_id}`}><img src={"http://localhost:8888/backend-web/public" +(item.image ? item.image : '/local/default.png')} alt="organization" className="thumb-md round-img"/> </Link></td>
                    <td><i className="ti-themify-favicon text-info" data-message={item.message} onClick={toggleModalShowMessage}></i></td>
                    <td>
                        <a className="text-secondary" target="_blank" href={"http://localhost:8888/backend-web/public" +(item.file ? item.file : '/local/default.png')}>
                            <img src={pdf} alt="organization" className="thumb-pdf"/>
                        </a>
                    </td>
                    <td><i className="fa fa-minus-circle m-l-5 text-danger cell-click font-20" data-id={item.id} onClick={toggleModalConfirmDeleteOffer}></i></td>
                </tr>
            )));
        }
    }, [offer]);
    useEffect(() => {
        listOffer();
    }, []);
    return (
        <>
            <h4 className="card-title">Danh sách đề xuất</h4>
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
                            <th className="cell-click">Công ty</th>
                            <th className="cell-click">Ảnh</th>
                            <th className="cell-click" data-container="body" title="Lời nhắn" data-toggle="popover" data-placement="top" data-content="Hello">Lời nhắn</th>
                            <th className="cell-click">Thông tin</th>
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
            <ModalConfirmDeleteOffer
            modal={modalConfirmDeleteOffer}
            toggle={toggleModalConfirmDeleteOffer}
            id={offerId}/>
            <ModalShowMessage
            modal={modalShowMessage}
            toggle={toggleModalShowMessage}
            message = {message}/>
        </>
    );
}
export default ListOffer;