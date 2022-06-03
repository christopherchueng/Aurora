import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../store/commentReducer";
import CommentForm from "./CommentForm";
import './index.css';

const Comments = ({tracks}) => {
    const dispatch = useDispatch();
    const { trackId } = useParams();
    const track = tracks[+trackId];
    const user = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comment.entries)
    const commentsArr = Object.values(comments);

    useEffect(() => {
        dispatch(getComments(+trackId))
    }, [dispatch])

    return (
        <div className='comment-section-ctn'>
            <div className='comment-textbox-ctn'>
                <CommentForm trackId={+trackId} user={user} />
            </div>
            <div className='track-comments'>
                <ul>
                    {commentsArr.map(comment => (
                        <>
                            <div className='track-comment-item'>
                                <li key={comment.id}>
                                    {comment.message}
                                </li>
                            </div>
                            <div className='comment-manip-ctn'>
                                <div className='edit-comment-ctn'>
                                    <button><i className="fa-solid fa-pen"></i></button>
                                </div>
                                <div className='delete-comment-ctn'>
                                    <button><i className="fa-solid fa-trash"></i></button>
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
