import { useState, useEffect, useRef } from "react";
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
    const comments = useSelector(state => state?.comment.entries)

    // States
    const { openEditCmt, setOpenEditCmt } = useUpdateContext();
    const [className, setClassName] = useState('');
    const [message, setMessage] = useState('')

    useEffect(() => {
        dispatch(getComments(+trackId))
    }, [dispatch])

    // useEffect(() => {
    //     dispatch(getComments(+trackId))
    // }, [dispatch])

    return (
        <div className='comment-section-ctn'>
            {user && <div className='comment-textbox-ctn'>
                <CreateCommentForm trackId={+trackId} user={user} />
            </div>
            }
            <div className='track-comments'>
                <CommentsSection
                    comments={comments}
                    user={user}
                    trackId={+trackId}
                    message={message}
                    setMessage={setMessage} />
            </div>
        </div>
    );
}

export default Comments;
