import { useDispatch, useSelector } from "react-redux";
import { removeTrack} from "../../store/trackReducer";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import './DeleteTrackComponent.css'

const DeleteTrackComponent = ({ showModal, setShowModal }) => {
    const { trackId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const tracks = useSelector(state => state.track.entries)
    const track = tracks[trackId]

    // const [showModal, setShowModal] = useState(false)

    const onDelete = (e) => {
        dispatch(removeTrack(track))
        history.push('/')
    }

    return (
        <>
            <div className='delete-ctn'>
                <div className='delete-confirm'>
                    <p>Are you sure you want to delete this track?</p>
                </div>
                <div className="delete-track-btns">
                    <div className='cancel-btn-ctn'>
                        <button className='cancel-btn' onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                    <div className='delete-track-ctn'>
                        <button onClick={onDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteTrackComponent;
