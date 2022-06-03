import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { postComment } from "../../store/commentReducer";


const CommentForm = ({trackId, user}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    // States
    const [message, setMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            message,
            trackId,
            userId: user.id
        }

        await dispatch(postComment(payload))
        setMessage('')
        history.push(`/tracks/${trackId}`)
    }
    return (
        <div className='comment-textbox'>
            <form onSubmit={onSubmit}>
                <textarea
                    name='comment'
                    value={message}
                    placeholder='Add a comment'
                    onChange={e => setMessage(e.target.value)}
                />
                <button>Add Comment</button>
            </form>

        </div>
    )
}

export default CommentForm;
