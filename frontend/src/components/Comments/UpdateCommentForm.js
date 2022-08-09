import { useState, useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComments, updateComment } from "../../store/commentReducer";
import { useUpdateContext } from "../../context/UpdateContext";
import './UpdateCommentForm.css';

const UpdateCommentForm = ({ comment, setIsEditing }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { trackId } = useParams();

    const [message, setMessage] = useState(comment.message)
    const [messageCount, setMessageCount] = useState(0);

    useEffect(() => {
        setMessage(comment?.message)
    }, [])

    useEffect(() => {
        setMessageCount(message.length)
    }, [message])

    const onSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            commentId: comment.id,
            message,
            trackId: comment?.trackId,
            userId: comment?.userId
        }

        await dispatch(updateComment(payload))
        setIsEditing(false)
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div id='update-comment-ctn'>
                    <textarea
                        name='comment'
                        value={message}
                        placeholder='Add a comment'
                        className="edit-comment-input"
                        onChange={e => setMessage(e.target.value)}
                        autoFocus
                        onFocus={e => e.target.setSelectionRange(message.length, message.length)}
                    />
                    <div className="comment-action-ctn">
                        {messageCount > 280
                        ?   <div className='char-count-cmt' style={{color: 'red', width: '70px'}}>
                                <span>{messageCount} / 280</span>
                            </div>
                        :   <div className='char-count-cmt'>
                                <span>{messageCount} / 280</span>
                            </div>}
                        <div className='cancel-comment'>
                            <button
                                type='button'
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                        <div className='submit-comment'>
                            <button
                                type='submit'
                                disabled={!message}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default UpdateCommentForm
