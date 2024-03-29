import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { deleteComment } from "../../store/commentReducer";
import './DeleteComment.css'


const DeleteComment = ({commentId, setShowModal}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const onDelete = async e => {
        e.preventDefault()

        const comment = await dispatch(deleteComment(commentId))
        setShowModal(false)
    }

    return (
        <>
            <div className='delete-ctn'>
                <div className='delete-cmt-confirm'>
                    <p>Are you sure you want to delete this comment?</p>
                </div>
                <div className="delete-cmt-btns">
                    <div className='cancel-btn-ctn'>
                        <button className='cancel-btn' onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                    <div className='delete-cmt-ctn'>
                        <button onClick={onDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteComment;
