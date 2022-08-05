import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTracks } from '../../store/trackReducer'
import { getComments, updateComment } from "../../store/commentReducer";
import { useUpdateContext } from "../../context/UpdateContext";
import UpdateCommentForm from "./UpdateCommentForm";
import DeleteCommentModal from "./DeleteCommentModal";
import './CommentsSection.css';

const CommentsSection = ({ comments, trackId, message, setMessage }) => {
    const dispatch = useDispatch();
    const { commentId } = useParams();
    const user = useSelector(state => state.session.user);
    // const user = useSelector(state => state.session.user)
    const commentsArr = Object.values(comments).reverse();
    // const comments = useSelector(state => state.comment.entries)

    // States
    const [className, setClassName] = useState('');

    const datePosted = (date) => {
        const dateCreated = new Date(date)
        const month = dateCreated.getMonth() + 1
        const day = dateCreated.getDate() + 1
        const year = dateCreated.getFullYear();
        return `${month}/${day}/${year}`
    }


    return (
        <>
            <div className='comment-list'>
                {commentsArr.map(comment => (
                    <div className='comment-content' key={`comment: ${comment.id}`}>
                        <div className='user-comment-ctn'>
                            <div className='user-ctn'>
                                {<span>{comment.userId === user?.id && user.username}</span>}
                            </div>
                            <div className='comment-ctn'>
                                <p>{comment?.message}</p>
                            </div>
                        </div>
                        <div className='date-actionBtns-ctn'>
                            <div className='date-ctn'>
                                <span>{datePosted(comment?.createdAt)}</span>
                            </div>
                            <div className='actionBtn-ctn'>
                                <div className='edit-btn-ctn'>
                                    {/* <UpdateCommentFormModal comment={comment} user={user} trackId={trackId} /> */}
                                </div>
                                <div className='delete-btn-ctn'>
                                    {comment.userId === user?.id && <DeleteCommentModal commentId={comment?.id} />}
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
