import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../store/commentReducer";
import { useUpdateContext } from "../../context/UpdateContext";
import './UpdateCommentForm.css';

const UpdateCommentForm = ({ comments, user }) => {
    const [message, setMessage] = useState()
    const [className, setClassName] = useState('');
    const commentsArray = Object.values(comments).reverse();
    const { openEditCmt, setOpenEditCmt } = useUpdateContext()

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <ul>
                {commentsArray.map(comment => (
                    <>
                        <div className='track-comment-item'>
                            <div className='comment-username-ctn'>
                                {/* <span className='comment-username'>{comment.User.username}</span> */}
                            </div>
                            <div className='comment-body'>
                                <div className='comment-section-ctn'>
                                    <li
                                        key={`update-${comment.id}`}
                                        // Created a unique class to compare to when making conditional ternary below
                                        className={`update-comment-${comment.id}-user-${comment.userId}`}
                                    >
                                        {className === `update-comment-${comment.id}-user-${user?.id}`
                                        ?
                                            (<form onSubmit={onSubmit}>
                                                <div>
                                                    <textarea
                                                        name='comment'
                                                        value={comment.message}
                                                        placeholder='Add a comment'
                                                        onChange={e => setMessage(e.target.value)}
                                                        />
                                                        <button
                                                            type='submit'
                                                            disabled={!message}
                                                            onClick={onSubmit}
                                                        >
                                                            Save changes
                                                        </button>
                                                        <button
                                                            type='button'
                                                            onClick={() => setOpenEditCmt(false)}
                                                        >
                                                            Cancel
                                                        </button>
                                                </div>
                                            </form>)
                                        : ""}
                                    </li>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </ul>
        </>
    )
}

export default UpdateCommentForm
