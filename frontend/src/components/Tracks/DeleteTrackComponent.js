import { useDispatch, useSelector } from "react-redux";
import { removeTrack} from "../../store/trackReducer";
import { Redirect, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const DeleteTrackComponent = () => {
    const { trackId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const tracks = useSelector(state => state.track.entries)
    const track = tracks[trackId]

    const [showModal, setShowModal] = useState(false)

    const onDelete = (e) => {
        dispatch(removeTrack(track))
        history.push('/')
        // console.log('what does dispatch(removeTrack(track)) return idk', dispatch(removeTrack(track)));
        setShowModal(false);
    }

    const cancelClick = (e) => {
        e.stopPropagation();
        setShowModal(false);
    }

    return (
        <>
            <div className='delete-ctn'>
                <div className='delete-confirm'>
                    <p>Are you sure you want to delete this track?</p>
                </div>
                <div className='cancel-btn-ctn'>
                    <button className='cancel-btn' onClick={cancelClick}>Cancel</button>
                </div>
                <div className='delete-btn-ctn'>
                    <button onClick={onDelete}>Delete</button>

                </div>
            </div>
        </>
    )
}

export default DeleteTrackComponent;
