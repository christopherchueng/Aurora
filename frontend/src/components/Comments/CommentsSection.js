import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTracks } from '../../store/trackReducer'
import { getComments, updateComment } from "../../store/commentReducer";
import { useUpdateContext } from "../../context/UpdateContext";
import UpdateCommentForm from "../UpdateCommentFormModal";
import './CreateCommentForm';
import UpdateCommentFormModal from "../UpdateCommentFormModal";

const CommentsSection = ({ user, comments, trackId, message}) => {
    const dispatch = useDispatch();
    const { commentId } = useParams();
    // const user = useSelector(state => state.session.user)
    const commentsArr = Object.values(comments).reverse();

    // States
    const [className, setClassName] = useState('');

    useEffect(() => {
        dispatch(getTracks())
    }, [dispatch])

    useEffect(() => {
        dispatch(getComments(+trackId))
    }, [dispatch, message])

    return (
        <>
            <ul>
                {commentsArr.map(comment => (
                    <li key={`comment: ${comment.id}`}>
                        <div className='user-comment-ctn'>
                            <div className='user-ctn'>
                                <span>{user?.username}</span>
                            </div>
                            <div className='comment-ctn'>
                                <p>{comment?.message}</p>
                            </div>
                        </div>
                        <div className='date-actionBtns-ctn'>
                            <div className='date-ctn'>
                                <span>{comment?.createdAt}</span>
                            </div>
                            <div className='actionBtn-ctn' hidden={comment.userId !== user?.id}>
                                <div className='edit-btn-ctn'>
                                    <UpdateCommentFormModal comment={comment} user={user} trackId={trackId} />
                                </div>
                                <div className='delete-btn-ctn'>

                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default CommentsSection;
