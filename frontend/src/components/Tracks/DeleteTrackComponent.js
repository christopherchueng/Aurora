import { useDispatch } from "react-redux";
import { removeTrack } from "../../store/trackReducer";
import { useParams } from "react-router-dom";

const DeleteTrackComponent = () => {
    return (
        <>
            <button>Delete</button>
            {/* <button onClick={() => dispatch(removeTrack(trackId, singleTrack?.User?.id))}>Delete</button> */}
        </>
    )
}

export default DeleteTrackComponent;
