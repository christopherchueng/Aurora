import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createTrack, getGenres } from "../../store/trackReducer";
import { genres } from "../../utils/genreData";
import ErrorMessage from '../FormTemplate/ErrorMessage'
import './CreateTrackForm.css'

const CreateTrackForm = ({tracks}) => {
    const user = useSelector(state => state.session.user)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const [trackPath, setTrackPath] = useState('')
    const [imagePath, setImagePath] = useState()
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [track, setTrack] = useState()

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        const validationErrors = {};
        if (!title) {
            validationErrors.title = 'Please provide a title.'
        }
        if (title.length > 100) {
            validationErrors.title = 'Please provide a title under 100 characters.'
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
            setErrors({});
            setHasSubmitted(false)
            setTrack(track);
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
                    <div id='top-row'>
                        {/* -------------------- TITLE -------------------- */}
                        <div className='title-div'>
                            <span>Title<span className='req'>*</span></span>
                            <input
                                name='title'
                                type='text'
                                value={title}
                                placeholder='Title'
                                onChange={e => setTitle(e.target.value)}
                            />
                            <div className='error-div'>
                                {hasSubmitted && <ErrorMessage error={errors.title} />}
                            </div>
                        </div>

                        {/* -------------------- TRACK PATH -------------------- */}
                        <div className='trackPath-div'>
                            <span>Track<span className='req'>*</span></span>
                            <input
                                name='trackPath'
                                type='text'
                                value={trackPath}
                                placeholder='Insert a track link'
                                onChange={e => setTrackPath(e.target.value)}
                            />
                            <div className='error-div'>
                                {hasSubmitted && <ErrorMessage error={errors.trackPath}/>}
                            </div>
                        </div>
                    </div>

                    <div id='middle-row'>
                        <div className='left-middle'>
                            {/* -------------------- IMAGE PATH -------------------- */}
                            <div className="imagePath-div">
                                <span>Cover photo</span>
                                <input
                                    name='imagePath'
                                    type='text'
                                    alt='https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/default-imagePath.png'
                                    value={imagePath}
                                    placeholder='Insert an image link'
                                    onChange={e => setImagePath(e.target.value)}
                                />
                            </div>

                            {/* -------------------- GENRE -------------------- */}
                            <div className='genre-div-ctn'>
                                <div className='genre-div'>
                                    <span>Genre<span className='req'>*</span></span>

                                    <select
                                        name='genre'
                                        value={genre}
                                        onChange={e => setGenre(e.target.value)}
                                    >
                                        <option value='' disabled></option>
                                        {genres.map(genre => (
                                            <option key={genre}>{genre}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='error-div'>
                                    {hasSubmitted && <ErrorMessage error={errors.genre} />}
                                </div>
                            </div>
                        </div>

                        {/* -------------------- PHOTO PREVIEW -------------------- */}
                        <div id='right-middle' className='cover-photo-ctn'>
                            {imagePath
                            ? <img className='cover-photo' src={imagePath}></img>
                            : <div style={{
                                border: '1px solid white',
                                width: '200px',
                                height: '200px',
                                display: "flex",
                                justifyContent: 'center',
                                alignItems: 'center' }} >
                                    Preview
                                </div>}
                        </div>
                    </div>

                    {/* -------------------- DESCRIPTION -------------------- */}
                    <div className='description-div'>
                        <span>Description</span>
                        <textarea
                            name='description'
                            value={description}
                            placeholder='Description'
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='create-track-btn'>
                        <button type='submit'>Upload</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTrackForm;
