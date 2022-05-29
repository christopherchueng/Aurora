import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createTrack } from "../../store/trackReducer";

const CreateTrackForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const [trackPath, setTrackPath] = useState('')
    const [imagePath, setImagePath] = useState('')
    const [errors, setErrors] = useState()

    const history = useHistory();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            description,
            genre,
            trackPath,
            imagePath
        }

        const track = await dispatch(createTrack(payload))

        if (track) {
            history.push(`/tracks/${track.id}`)
            setTitle('');
            setDescription('');
            setGenre('');
            setTrackPath('');
            setImagePath('');
        }
    }

    return (
        <div className='create-track-form-ctn'>
            <h1>Upload</h1>

        </div>
    )
}

export default CreateTrackForm;
