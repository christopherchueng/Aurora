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

    const showPostBtn = () => {
        const prevVal = boxClicked; // Box is closed
        setBoxClicked(!prevVal) // Set box to open
        if (prevVal) { // if Box is open
            setBoxClicked(prevVal) // set box to open/true
        }
        else {
            setBoxClicked(!prevVal) // Otherwise, box is closed
        }
    }

    const hidePostBtn = () => {
        const prevVal = boxClicked; // Box is closed
        setBoxClicked(prevVal) // set box to closed
        if (!prevVal) { // If box is NOT closed (open),
            setBoxClicked(prevVal) // set box as open/true
        } else {
            setBoxClicked(!prevVal) // Otherwise, keep box closed
        }
    }

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
                            onClick={showPostBtn}
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
                                        onClick={hidePostBtn}
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
