import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
import { updateTrack } from "../../store/trackReducer";

const UpdateTrackForm = ({ track }) => {
    // const [title, setTitle] = useState(track.title)
    // const [description, setDescription] = useState(track.description)
    // const [genre, setGenre] = useState(track.genre)
    // const [imagePath, setImagePath] = useState(track.imagePath)
    // const [errors, setErrors] = useState({});
    // const [hasSubmitted, setHasSubmitted] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const payload = {
        //     title,
        //     description,
        //     genre,
        //     imagePath,
        // }

        // const track = await dispatch(updateTrack(payload))

    }

    return (
        <>
            <button>Edit</button>
        </>
    )
}

export default UpdateTrackForm;
