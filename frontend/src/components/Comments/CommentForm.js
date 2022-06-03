import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postComment } from "../../store/commentReducer";


const CommentForm = ({trackId, user}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    // States
    const [message, setMessage] = useState('')
    const [boxClicked, setBoxClicked] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            message,
            trackId,
            userId: user.id
        }

        await dispatch(postComment(payload))
        setMessage('')
        setBoxClicked(false)
        history.push(`/tracks/${trackId}`)
    }
    return (
        <>
            <div className='comment-textbox'>
                <form onSubmit={onSubmit}>
                    <div>
                        <textarea
                            name='comment'
                            value={message}
                            placeholder='Add a comment'
                            onChange={e => setMessage(e.target.value)}
                            onClick={() => setBoxClicked(true)}
                            />
                            {boxClicked
                            ?
                                <>
                                    <button
                                        type='submit'
                                        disabled={!message}
                                        onClick={onSubmit}
                                    >
                                        Add Comment
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => setBoxClicked(!boxClicked)}
                                    >
                                        Cancel
                                    </button>
                                </>
                            :   ''}
                    </div>
                </form>

            </div>

        </>
    )
}

export default CommentForm;
