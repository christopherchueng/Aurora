import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../store/commentReducer";
import { useUpdateContext } from "../../context/UpdateContext";
import './UpdateCommentForm.css';

const UpdateCommentForm = ({ comments, user, className, setClassName }) => {
    const [message, setMessage] = useState('')
    const commentsArr = Object.values(comments).reverse();
    const { openEditCmt, setOpenEditCmt } = useUpdateContext()

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <ul>
                {commentsArr.map(comment => (
                    <>
                        <div className='track-comment-item'>
                            <div className='comment-username-ctn'>
                                <span className='comment-username'>{comment.User.username}</span>
                            </div>
                            <div className='comment-body'>
                                <div className='comment-section-ctn'>
                                    <li
                                        key={comment.id}
                                        // Created a unique class to compare to when making conditional ternary below
                                        className={`comment-${comment.id}-user-${comment.userId}`}
                                        // When cursor hovers over a specific comment, the className will be set to have a unique name
                                        onMouseEnter={(e) => setClassName(e.target.className)}
                                        // When cursor is not on the comment, don't do anything
                                        onMouseLeave={() => setClassName('')}
                                    >
                                        {className === `comment-${comment.id}-user-${user?.id}`
                                        ?
                                            {/* the comment body */}
                                            (<form onSubmit={onSubmit}>
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
                                        {/* Ternary is checking to see if the state variable className matches with the li className  */}
                                        {className === `comment-${comment.id}-user-${user?.id}`
                                        // If matches, show edit and delete buttons. Otherwise, don't do anything.
                                        ? <div className='comment-manip-ctn'>
                                            <div className='edit-comment-ctn'>
                                                <button
                                                    type='button'
                                                    className='inline-edit-comp'
                                                    onClick={() => setOpenEditCmt(true)}
                                                >
                                                    <i className="fa-solid fa-pen"></i>
                                                </button>
                                            </div>
                                            <div className='delete-comment-ctn'>
                                                <button><i className="fa-solid fa-trash"></i></button>
                                            </div>
                                        </div>
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
