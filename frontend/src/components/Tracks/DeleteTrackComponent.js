import { useDispatch, useSelector } from "react-redux";
import { removeTrack} from "../../store/trackReducer";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const DeleteTrackComponent = () => {
    const { trackId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    // const track = useSelector(state => console.log(state.tracks))

    const [showModal, setShowModal] = useState(false)

    const onDelete = async (e) => {
        e.preventDefault();
        const track = await dispatch(removeTrack(trackId))
        if (track) {
            setShowModal(false);
            history.push('/discover');
        }
    }

    return (
        <>
            <div className='delete-ctn'>
                <div className='delete-confirm'>
                    <p>Are you sure you want to delete this track?</p>
                </div>
                <div className='delete-selections'>
                    <button onClick={onDelete}>Delete</button>
                    <button className='cancel-delete' onClick={() => setShowModal(false)}>Cancel</button>

                </div>
            </div>
        </>
    )
}

export default DeleteTrackComponent;
