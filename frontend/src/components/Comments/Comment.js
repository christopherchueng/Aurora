import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import UpdateCommentForm from "./UpdateCommentForm"
import DeleteCommentModal from "./DeleteCommentModal"
import './Comment.css'

const Comment = ({ comment }) => {
    const { commentId } = useParams();
    const user = useSelector(state => state.session.user);
    const allUsers = useSelector(state => state?.user?.entries)

    // States
    const [className, setClassName] = useState('');
    const [messageCount, setMessageCount] = useState(0);
    const [isEditing, setIsEditing] = useState(false)
    const [showActions, setShowActions] = useState(false)

    useEffect(() => {
        setMessageCount(comment?.message?.length)
    }, [comment?.message])

    const datePosted = (date) => {
        const dateCreated = new Date(date)
        const month = dateCreated.getMonth() + 1
        const day = dateCreated.getDate() + 1
        const year = dateCreated.getFullYear();
        return `${month}/${day}/${year}`
    }

    return (
        <div className='comment-ctn' onMouseEnter={() => setShowActions(true)} onMouseLeave={() => setShowActions(false)}>
            {isEditing ?
            <UpdateCommentForm comment={comment} setIsEditing={setIsEditing} />
            :
            <>
                <div className='user-comment-ctn'>
                    <div className='user-ctn'>
                        {<span>{allUsers[comment.userId]?.username}</span>}
                    </div>
                    <div className='comment-ctn'>
                        <p>{comment?.message}</p>
                    </div>
                </div>
                <div className='date-actionBtns-ctn'>
                    <div className='date-ctn'>
                        <span>{datePosted(comment?.createdAt)}</span>
                    </div>
                    {comment.userId === user?.id &&
                        <div className='actionBtn-ctn'>
                            {showActions &&
                            <>
                                <div className='edit-btn-ctn'>
                                    <button onClick={() => setIsEditing(!isEditing)}>
                                        <span className="fa-solid fa-pen"></span>
                                    </button>
                                </div>
                                <div className='delete-btn-ctn'>
                                    <DeleteCommentModal commentId={comment?.id} />
                                </div>
                            </>}
                        </div>
                    }
                </div>
            </>
            }
        </div>
    )

}

export default Comment
