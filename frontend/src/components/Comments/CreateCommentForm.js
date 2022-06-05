import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { postComment } from "../../store/commentReducer";
import DeleteTrackModal from "../Tracks/DeleteTrackModal";
import './CreateCommentForm.css'


const CreateCommentForm = ({trackId, user, isNewComment, setIsNewComment}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)

    // States
    const [message, setMessage] = useState('')
    const [boxClicked, setBoxClicked] = useState(false)

    useEffect(() => {
        setIsNewComment(false)
    }, [isNewComment])

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
        setIsNewComment(true);
        history.push(`/tracks/${comment.trackId}`)
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

export default CreateCommentForm;
