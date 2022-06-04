import { useState, useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComments, updateComment } from "../../store/commentReducer";
import { useUpdateContext } from "../../context/UpdateContext";
import './UpdateCommentForm.css';

const UpdateCommentForm = ({ comment, user, trackId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [message, setMessage] = useState(comment.message)
    // const [className, setClassName] = useState('');
    const { openEditCmt, setOpenEditCmt } = useUpdateContext()

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            commentId: comment.id,
            message,
            trackId: +trackId,
            userId: user.id
        }

        await dispatch(updateComment(payload))
        history.push(`/`)
        history.push(`/tracks/${trackId}`)

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
                            onClick={() => setOpenEditCmt(false)}
                        >
                            Cancel
                        </button>
                </div>
            </form>
        </>
    )
}

export default UpdateCommentForm
