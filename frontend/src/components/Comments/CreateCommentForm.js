import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { postComment } from "../../store/commentReducer";
import DeleteTrackModal from "../Tracks/DeleteTrackModal";
import { useUpdateContext } from "../../context/UpdateContext";
import './CreateCommentForm.css'


const CreateCommentForm = ({trackId, user}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)

    // States
    const [message, setMessage] = useState('')
    const { isNewComment, setIsNewComment, boxClicked, setBoxClicked } = useUpdateContext();

    useEffect(() => {
        setIsNewComment(true)
    }, [])

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
