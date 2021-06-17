import React, { useEffect, useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import blogApi from '../../../api/admin/blogApi';
import Constants from '../../../constants/constants';
import LoadingOverlay from '../../loading/loading_overlay';

function Create(props) {
    const [title, setTitle] = useState();
    const [image, setImage] = useState();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
    }
    const handleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleChangeFile = (e) =>{
        setImage(e.target.files[0]);
    }
    const [loadingOverlay, setLoadingOverlay] = useState(false);
    const onCreateBlog = () => {
        setLoadingOverlay(true);
        const form = new FormData();
        form.append('title',title);
        form.append('content',draftToHtml(convertToRaw(editorState.getCurrentContent())).toString());
        form.append('image',image);
        blogApi.createBlog(form).then((response) => {
            let mounted = true;
            if (mounted) {
                if (response.status === Constants.HTTP_STATUS.OK) {
                    setLoadingOverlay(false);
                    window.location.reload();
                }
            }
            return () => mounted = false;
        }, (error) => {
            setLoadingOverlay(false);
            console.log("fail");
        });
    }
    return (
        <>
            <div className="form-group">
                <label className="col-md-12">Tiêu đề :</label>
                <div className="col-md-12">
                    <input className="form-control form-control-line" value={title ? title : ''} name="title" onChange={handleChange} />
                </div>
            </div>
            <div className="form-group">
                <label className="col-md-12">Ảnh :</label>
                <div className="d-flex justify-content-center">
                    <div className="col-md-6">
                        <input type="file" id="input-file-now" className="dropify" onChange={handleChangeFile} />
                    </div>
                </div>
            </div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
            />;
            <div className="text-center box-action">
                <button onClick={onCreateBlog} className="btn btn-info">Tạo bài viết</button>
            </div>
            {loadingOverlay && <LoadingOverlay />}
        </>
    );
}
export default Create;