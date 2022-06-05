import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { postComment } from "../../store/commentReducer";
import DeleteTrackModal from "../Tracks/DeleteTrackModal";
import { useUpdateContext } from "../../context/UpdateContext";
import ErrorMessage from "../FormTemplate/ErrorMessage";
import './CreateCommentForm.css'


const CreateCommentForm = ({trackId, user}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)

    // States
    const [message, setMessage] = useState('')
    const [messageCount, setMessageCount] = useState(0);
    const { isNewComment, setIsNewComment, boxClicked, setBoxClicked } = useUpdateContext();

    useEffect(() => {
        setIsNewComment(true)
    }, [])

    useEffect(() => {
        setMessageCount(message.length)
    }, [message])

    const onSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            message,
            trackId,
            userId: user.id
        }

        const comment = await dispatch(postComment(payload))
        setMessage('')
        setBoxClicked(false)

        history.push(`/tracks/${comment.trackId}`)
    }

    return (
        <>
            <div className='comment-textbox'>
                <form onSubmit={onSubmit}>
                    <div className='add-comment-ctn'>
                        <textarea
                            name='comment'
                            value={message}
                            placeholder='Add a comment'
                            className='add-comment-box'
                            onChange={e => setMessage(e.target.value)}
                            onClick={() => setBoxClicked(true)}
                            />
                            {boxClicked
                            ?
                                <div className='comment-action-ctn'>
                                    {messageCount > 280
                                    ?   <div className='char-count-cmt' style={{color: 'red'}}>
                                            <span>{messageCount} / 280</span>
                                        </div>
                                    :   <div className='char-count-cmt'>
                                            <span>{messageCount} / 280</span>
                                        </div>}
                                    <div className='cancel-comment'>
                                        <button
                                            type='button'
                                            onClick={() => setBoxClicked(!boxClicked)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                    <div className='submit-comment'>
                                        <button
                                            type='submit'
                                            disabled={!message}
                                            onClick={() => setIsNewComment(false)}
                                        >
                                            Add Comment
                                        </button>
                                    </div>
                                </div>
                            :   ''}
                    </div>
                </form>

            </div>

        </>
    )
}

export default CreateCommentForm;
