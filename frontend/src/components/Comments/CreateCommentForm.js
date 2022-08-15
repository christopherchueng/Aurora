import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postComment } from "../../store/commentReducer";
import ErrorMessage from "../FormTemplate/ErrorMessage";
import './CreateCommentForm.css'


const CreateCommentForm = ({trackId, user}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)

    // States
    const [message, setMessage] = useState('')
    const [messageCount, setMessageCount] = useState(0);
    const [boxClicked, setBoxClicked] = useState(false);

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
                            style={{borderBottom: messageCount > 280 ? '1px solid rgb(246, 94, 94)' : '1px solid white'}}
                            />
                            {boxClicked
                            ?
                                <div className='comment-action-ctn'>
                                    {messageCount > 280
                                    ?   <div className='char-count-cmt' style={{color: 'rgb(246, 94, 94)', width: '70px'}}>
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
