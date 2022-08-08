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
    // const [className, setClassName] = useState('');
    // const { openEditCmt, setOpenEditCmt } = useUpdateContext()

    useEffect(() => {
        setMessage(comment?.message)
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            commentId: comment.id,
            message,
            trackId: comment?.trackId,
            userId: comment?.userId
        }

        await dispatch(updateComment(payload))
        await dispatch(getComments(+trackId))
        setIsEditing(false);
        // history.push('/')
        // history.push(`/tracks/${trackId}`)

    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    <textarea
                        name='comment'
                        value={message}
                        placeholder='Add a comment'
                        onChange={e => setMessage(e.target.value)}
                    />
                        <button
                            type='submit'
                            disabled={!message}
                        >
                            Save
                        </button>
                        <button
                            type='button'
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                </div>
            </form>
        </>
    )
}

export default UpdateCommentForm
