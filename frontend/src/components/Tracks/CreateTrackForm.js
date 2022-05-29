import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createTrack } from "../../store/trackReducer";
import { genres } from "../../utils/genreData";
import './CreateTrackForm.css'

const CreateTrackForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const [trackPath, setTrackPath] = useState('')
    const [imagePath, setImagePath] = useState('')
    const [errors, setErrors] = useState()

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('in Track useEffect!')
    }, [])

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
        }

        setTitle('');
        setDescription('');
        setGenre('');
        setTrackPath('');
        setImagePath('');
    }

    return (
        <div className='create-track-form-ctn'>
            <h1>Upload</h1>
            <div className='track-form-content'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            name='title'
                            type='text'
                            value={title}
                            placeholder='Title'
                            onChange={e => setTitle(e.target.value)}
                        />

                    </div>
                    <div>
                        <textarea
                            name='description'
                            value={description}
                            placeholder='Description'
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <select
                            name='genre'
                            value={genre}
                            onChange={e => setGenre(e.target.value)}
                        >
                            <option value='' disabled>
                                Select a genre
                            </option>
                            {genres.map(genre => (
                                <option key={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <input
                            name='trackPath'
                            type='text'
                            value={trackPath}
                            placeholder='Insert a track link'
                            onChange={e => setTrackPath(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            name='imagePath'
                            type='text'
                            value={imagePath}
                            placeholder='Insert an image link'
                            onChange={e => setImagePath(e.target.value)}
                        />
                    </div>
                    <div>
                        <button>Upload</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTrackForm;
