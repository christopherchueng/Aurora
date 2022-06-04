import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComments, updateComment } from "../../store/commentReducer";
import { useUpdateContext } from "../../context/UpdateContext";
import './UpdateCommentForm.css';

const UpdateCommentForm = ({ comment, user, trackId }) => {
    const dispatch = useDispatch();

    const [message, setMessage] = useState()
    const [className, setClassName] = useState('');
    const { openEditCmt, setOpenEditCmt } = useUpdateContext()

    // useEffect(() => {
    //     dispatch(getComments(+trackId))
    // }, [dispatch])

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            message,
            trackId: +trackId,
            userId: user.id
        }

        await dispatch(updateComment(payload))
        setOpenEditCmt(false);


    }

    return (
        <>
            <form>
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
                            onSubmit={onSubmit}
                        >
                            Save changes
                        </button>
                        <button
                            type='button'
                            onClick={(e) => setOpenEditCmt(false)}
                        >
                            Cancel
                        </button>
                </div>
            </form>
        </>
    )
}

export default UpdateCommentForm
