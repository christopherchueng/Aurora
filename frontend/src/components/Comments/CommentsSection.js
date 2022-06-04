import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTracks } from '../../store/trackReducer'
import { getComments, updateComment } from "../../store/commentReducer";
import { useUpdateContext } from "../../context/UpdateContext";
import UpdateCommentForm from "./UpdateCommentForm";
import './CreateCommentForm';

const CommentsSection = ({ user, comments, trackId, message, setMessage}) => {
    const dispatch = useDispatch();
    const { commentId } = useParams();
    // const user = useSelector(state => state.session.user)
    const commentsArr = Object.values(comments).reverse();
    // const comments = useSelector(state => state.comment.entries)

    // States
    const [className, setClassName] = useState('');
    const { openEditCmt, setOpenEditCmt } = useUpdateContext();

    useEffect(() => {
        dispatch(getTracks())
    }, [dispatch])

    useEffect(() => {
        dispatch(getComments())
    }, [dispatch])

    // className === `comment-${comment.id}-user-${user?.id}`

    return (
        <>
            <ul>
                {commentsArr.map(comment => (
                    <div className='track-comment-item'>
                        {/* Need a unique key. Come back to this later. */}
                        <li key={`comment: ${comment.id}`}>
                            <div className='user-comment-ctn'>

                                {/* ------------------ USERNAME ------------------ */}
                                <div className='username-ctn'>
                                    <span>{comment.User?.username}</span>
                                </div>

                                {/* ------------------ COMMENT ------------------ */}
                                <div className='comment-ctn' hidden={openEditCmt}>
                                    <p>{comment.message}</p>
                                </div>

                                {/* ------------------ UPDATE FORM ------------------ */}
                                <div className='edit-comment-form' hidden={!openEditCmt}>
                                    <UpdateCommentForm comment={comment} user={user} trackId={+trackId} />
                                </div>


                            </div>

                            <div className='date-actionBtn-ctn' hidden={openEditCmt}>

                                {/* ------------------ DATE ------------------ */}
                                <div className='date-ctn'>
                                    <span>{comment.createdAt}</span>
                                </div>

                                {/* ------------------ EDIT/DELETE ------------------ */}
                                <div className='comment-action-ctn'>
                                    <div className='comment-edit-ctn'>
                                        <button
                                            onClick={() => setOpenEditCmt(true)}>
                                            <i className="fa-solid fa-pen"></i>
                                        </button>
                                    </div>
                                    <div className='comment-delete-ctn'>
                                        <button><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                </div>
                            </div>

                        </li>
                    </div>
                ))}
            </ul>
        </>
    );
}

export default CommentsSection;
