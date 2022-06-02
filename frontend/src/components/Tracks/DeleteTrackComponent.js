import { useDispatch } from "react-redux";
import { removeTrack} from "../../store/trackReducer";
import { useHistory } from "react-router-dom";

const DeleteTrackComponent = ({ trackId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const onClick = () => {
        dispatch(removeTrack(trackId))

        if (trackId) {
            history.push('/discover');
        }
    }

    return (
        <>
            <button onClick={onClick}>Delete</button>
        </>
    )
}

export default DeleteTrackComponent;
