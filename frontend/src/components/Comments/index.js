import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../store/commentReducer";
import CreateCommentForm from "./CreateCommentForm";
import UpdateCommentForm from "./UpdateCommentForm";
import CommentsSection from "./CommentsSection";
import { useUpdateContext } from "../../context/UpdateContext";
import './index.css';

const Comments = ({tracks}) => {
    const dispatch = useDispatch();
    const { trackId } = useParams();
    const track = tracks[+trackId];
    const user = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comment.entries)
    const commentsArr = Object.values(comments).reverse();


    // States
    const { openEdit, setOpenEdit } = useUpdateContext();
    const [className, setClassName] = useState('');

    useEffect(() => {
        dispatch(getComments(+trackId))
    }, [dispatch])

    return (
        <div className='comment-section-ctn'>
            <div className='comment-textbox-ctn'>
                <CreateCommentForm trackId={+trackId} user={user} />
            </div>
            <div className='track-comments'>
                <ul>
                    {commentsArr.map(comment => (
                        <>
                            <div className='track-comment-item'>
                                <div className='comment-username-ctn'>
                                    <span className='comment-username'>{comment.User.username}</span>
                                </div>
                                <div className='comment-body'>
                                    {openEdit
                                        ? <UpdateCommentForm  />
                                        : <CommentsSection comments={comments} user={user}/>
                                    }
                                </div>
                            </div>

                        </>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Comments;
