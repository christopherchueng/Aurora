import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTracks } from '../../store/trackReducer'
import { getUsers } from "../../store/user";
import './CommentsSection.css';
import Comment from "./Comment";

const CommentsSection = ({ comments }) => {
    const dispatch = useDispatch();

    // const user = useSelector(state => state.session.user)
    const commentsArr = Object.values(comments).reverse();
    // const comments = useSelector(state => state.comment.entries)

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <>
            <div className='comment-list'>
                {commentsArr.map(comment => (
                    <div className='comment-content' key={`comment: ${comment.id}`}>
                        <Comment comment={comment} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default CommentsSection;
