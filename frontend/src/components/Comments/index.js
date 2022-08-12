import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../store/commentReducer";
import CreateCommentForm from "./CreateCommentForm";
import { getUsers } from "../../store/user";
import Comment from "./Comment";
import './index.css';

const Comments = ({tracks}) => {
    const dispatch = useDispatch();
    const { trackId } = useParams();
    const track = tracks[+trackId];
    const user = useSelector(state => state?.session?.user)
    const comments = useSelector(state => state?.comment?.entries)

    // States
    const [className, setClassName] = useState('');
    const [message, setMessage] = useState('')

    const commentsArr = Object.values(comments).reverse();

    useEffect(() => {
        dispatch(getUsers())
        dispatch(getComments(+trackId))
    }, [dispatch, trackId])

    return (
        <div className='comment-section-ctn'>
            {user && <div className='comment-textbox-ctn'>
                <CreateCommentForm trackId={+trackId} user={user} />
            </div>
            }
            <div className='track-comments'>
                <div className='comment-list'>
                    {commentsArr.length !== 0
                    ? commentsArr.map(comment => (
                        <div className='comment-content' key={comment.id}>
                            <Comment comment={comment} />
                        </div>
                    ))
                    : <p className="no-comments">{`There are no comments under '${track?.title}.' Be the first to add a comment!`}</p>}
                </div>
            </div>
        </div>
    );
}

export default Comments;
