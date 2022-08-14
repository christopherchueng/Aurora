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
    const [imagePath, setImagePath] = useState('')
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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
        if (imagePath.type && !imagePath.type.includes('image')) {
            validationErrors.imagePath = 'Please select a valid file.'
        }

        setErrors(validationErrors);

    }, [title, genre, trackPath, imagePath])

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

        const data = await dispatch(createTrack(payload))
        if (data && data.errors) {
            setErrors(data)
        } else {
            setTitle('')
            setDescription('');
            setGenre('');
            setTrackPath('');
            setImagePath('');
            setErrors({});
            setHasSubmitted(false)
            history.push(`/tracks/${data.id}`)
        }
    }

    const updateTrackFile = (e) => {
        const file = e.target.files[0];
        if (file) setTrackPath(file)
    }

    const updateImageFile = (e) => {
        const file = e.target.files[0];
        if (file) setImagePath(file)

    }

    return (
        <div className='create-track-form-ctn'>
            <div className='create-track-content'>
                <h1>Upload</h1>
                <span className="asterisk-required"><span className='req'>*</span>All required fields are marked with an asterisk.</span>
                <div className='track-form-content'>
                    <form onSubmit={handleSubmit}>
                        <div id='form-top'>
                            <div id='form-left'>
                                {/* -------------------- TITLE -------------------- */}
                                <div className='title-div'>
                                    <span>Title<span className='req'>*</span></span>
                                    <input
                                        name='title'
                                        type='text'
                                        value={title}
                                        placeholder='Title'
                                        onChange={e => setTitle(e.target.value)}
                                        style={{border: errors.title && hasSubmitted ? '1px solid rgb(246, 94, 94)' : ''}}
                                    />
                                    <div className='error-div'>
                                        {hasSubmitted && <ErrorMessage error={errors.title} />}
                                    </div>
                                </div>
                                {/* -------------------- TRACK PATH -------------------- */}
                                <div className='trackPath-div'>
                                    <span>Track<span className='req'>*</span></span>
                                    <label
                                        className='trackPath-input-label'
                                        style={{border: errors.trackPath && hasSubmitted ? '1px solid rgb(246, 94, 94)' : ''}}
                                    >
                                        {trackPath ? trackPath.name : 'No track chosen'}
                                        <input
                                            name='trackPath'
                                            type='file'
                                            placeholder='Insert a track link'
                                            onChange={updateTrackFile}
                                            hidden
                                        />
                                    </label>
                                    <div className='error-div'>
                                        {hasSubmitted && <ErrorMessage error={errors.trackPath}/>}
                                    </div>
                                </div>
                                {/* -------------------- GENRE -------------------- */}
                                <div className='genre-div-ctn'>
                                    <div className='genre-div'>
                                        <span>Genre<span className='req'>*</span></span>
                                        <select
                                            name='genre'
                                            value={genre}
                                            onChange={e => setGenre(e.target.value)}
                                            style={{border: errors.genre && hasSubmitted ? '1px solid rgb(246, 94, 94)' : ''}}
                                        >
                                            <option value='' disabled>Select a genre...</option>
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
                            <div id='form-right'>
                                {/* -------------------- PHOTO PREVIEW -------------------- */}
                                <div id='right-middle' className='create-cover-photo-ctn'>
                                    <div className='preview-ctn' style={{border: errors.imagePath && hasSubmitted ? '1px solid rgb(246, 94, 94)' : ''}}>
                                        {imagePath ? <span className="create-name-ellipsis">{imagePath.name}</span> : 'No image chosen'}
                                        <label className="imagePath-input-label">
                                            {/* {imagePath ? imagePath : 'No image chosen'} */}
                                            <div>
                                                <i className="fa-solid fa-camera"></i>
                                                Upload image
                                            </div>
                                            <input
                                                name='imagePath'
                                                type='file'
                                                // alt='https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/default-imagePath.png'
                                                placeholder='Insert an image link'
                                                onChange={updateImageFile}
                                                hidden
                                            />
                                        </label>
                                    </div>
                                    <div className='error-div photo-preview-error'>
                                        {hasSubmitted && <ErrorMessage error={errors.imagePath} />}
                                    </div>
                                </div>
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
                        <div className="update-track-btns">
                            <div className='cancel-track-btn'>
                                <button onClick={() => history.push(`/`)}>Cancel</button>
                            </div>
                            <div className='create-track-btn'>
                                <button type='submit'>Upload</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateTrackForm;
