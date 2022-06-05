import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTracks } from '../../store/trackReducer'
import { getComments, updateComment } from "../../store/commentReducer";
import { useUpdateContext } from "../../context/UpdateContext";
import UpdateCommentForm from "./UpdateCommentForm";
import DeleteCommentModal from "./DeleteCommentModal";
import './CreateCommentForm';

const CommentsSection = ({ comments, trackId, message, setMessage, isNewComment, setIsNewComment }) => {
    const dispatch = useDispatch();
    const { commentId } = useParams();
    const user = useSelector(state => state.session.user);
    // const user = useSelector(state => state.session.user)
    const commentsArr = Object.values(comments).reverse();
    // const comments = useSelector(state => state.comment.entries)

    // States
    const [className, setClassName] = useState('');
    const { openEditCmt, setOpenEditCmt } = useUpdateContext();

    // useEffect(() => {
    //     dispatch(getComments(+trackId))
    // }, [dispatch])

    // useEffect(() => {
    //     dispatch(getTracks())
    // }, [dispatch])


    return (
        <>
            <div className='comment-list'>
                {commentsArr.map(comment => (
                    <div key={`comment: ${comment.id}`}>
                        <div className='user-comment-ctn'>
                            <div className='user-ctn'>
                                <span>{comment.User?.username}</span>
                            </div>
                            <div className='comment-ctn'>
                                <p>{comment?.message}</p>
                            </div>
                        </div>
                        <div className='date-actionBtns-ctn'>
                            <div className='date-ctn'>
                                <span>{comment?.createdAt}</span>
                            </div>
                            <div className='actionBtn-ctn'>
                                <div className='edit-btn-ctn'>
                                    {/* <UpdateCommentFormModal comment={comment} user={user} trackId={trackId} /> */}
                                </div>
                                <div className='delete-btn-ctn'>
                                    {comment?.User?.id === user?.id || !isNewComment
                                    ? <DeleteCommentModal commentId={comment?.id} isNewComment={isNewComment} setIsNewComment={setIsNewComment} />
                                    : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default CommentsSection;
