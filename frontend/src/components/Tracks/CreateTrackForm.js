import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createTrack, getGenres } from "../../store/trackReducer";
import { genres } from "../../utils/genreData";
import ErrorMessage from '../FormTemplate/ErrorMessage'
import { useImagePathContext } from "../../context/NoImagePathContext";
import './CreateTrackForm.css'

const CreateTrackForm = () => {
    const user = useSelector(state => state.session.user)
    // const { imagePath, setImagePath } = useImagePathContext()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const [trackPath, setTrackPath] = useState('')
    const [imagePath, setImagePath] = useState('')
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        const validationErrors = {};
        if (!title) {
            validationErrors.title = 'Please provide a title.'
        }
        if (!genre) {
            validationErrors.genre = 'Please select a genre.'
        }
        if (!trackPath) {
            validationErrors.trackPath = 'Please provide a track.'
        }

        setErrors(validationErrors);

    }, [title, genre, trackPath])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const payload = {
            title,
            description,
            genre,
            trackPath,
            imagePath,
            userId: user.id
        }

        const track = await dispatch(createTrack(payload))
        if (track) {
            if (!imagePath) {
                setImagePath('https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/default-imagePath.png')
            }
            setErrors({});
            setHasSubmitted(false)
            history.push(`/tracks/${track.id}`)
        }

        setTitle('');
        setDescription('');
        setGenre('');
        setTrackPath('');
        setImagePath('');
        setErrors({})
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
                        {hasSubmitted && <ErrorMessage error={errors.title} />}
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
                        {hasSubmitted && <ErrorMessage error={errors.genre} />}
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
                    {hasSubmitted && <ErrorMessage error={errors.trackPath}/>}
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
                        <button type='submit'>Upload</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTrackForm;
