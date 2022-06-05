import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { deleteComment } from "../../store/commentReducer";


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
                <div className='delete-confirm'>
                    <p>Are you sure you want to delete this track?</p>
                </div>
                <div className='delete-btn-ctn'>
                    <button onClick={onDelete}>Delete</button>
                </div>
            </div>
        </>
    )
}

export default DeleteComment;
