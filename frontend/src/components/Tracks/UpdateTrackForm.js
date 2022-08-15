import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneTrack, updateTrack } from "../../store/trackReducer";
import { genres } from "../../utils/genreData";
import ErrorMessage from '../FormTemplate/ErrorMessage'
import './UpdateTrackForm.css'

const UpdateTrackForm = () => {
    const user = useSelector(state => state?.session?.user)
    const track = useSelector(state => state?.track?.entries)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const [trackPath, setTrackPath] = useState('')
    const [imagePath, setImagePath] = useState('')
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { trackId } = useParams()
    console.log('image', imagePath)

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        dispatch(getOneTrack(trackId))
    }, [dispatch])

    useEffect(() => {
        if (track[trackId]) {
            setTitle(track[trackId]?.title)
            setDescription(track[trackId]?.description)
            setGenre(track[trackId]?.genre)
            setTrackPath(track[trackId]?.trackPath)
            setImagePath(track[trackId]?.imagePath)
        }
    }, [track[trackId]])

    useEffect(() => {
        const validationErrors = {};
        const acceptedImageFiles = ['.jpg', '.jpeg', '.png', '.webp']

        if (!title) {
            validationErrors.title = 'Please provide a title.'
        }
        if (title?.length > 100) {
            validationErrors.title = 'Please provide a title under 100 characters.'
        }
        if (!genre) {
            validationErrors.genre = 'Please select a genre.'
        }
        if (imagePath.type && !imagePath.type.includes('image')) {
            validationErrors.imagePath = 'Please select a valid file.'
        }
        if (imagePath.name &&
            !acceptedImageFiles.includes(`.${(imagePath.name.split('.')[1]).toLowerCase()}`) &&
            !acceptedImageFiles.includes(`.${(imagePath.type.split('/')[1]).toLowerCase()}`)) {
            validationErrors.imagePath = 'Please select a valid file.'
        }

        setErrors(validationErrors);

    }, [title, genre, imagePath])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        const payload = {
            trackId,
            title,
            description,
            genre,
            trackPath,
            imagePath,
            userId: user.id
        }

        const data = await dispatch(updateTrack(payload))
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
            history.push(`/tracks/${trackId}`)
        }
    }

    const updateImageFile = (e) => {
        const file = e.target.files[0];
        if (file) setImagePath(file)
    }

    return (
        <div className='edit-track-form-ctn'>
            <div className='edit-track-content'>
                <h1>Edit Track</h1>
                <span className="asterisk-required"><span className='req'>*</span>All required fields are marked with an asterisk.</span>
                <div className='edit-track-form-content'>
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
                                <div id='edit-right-middle' className='cover-photo-ctn'>
                                    <div className='edit-preview-ctn' style={{border: errors.imagePath && hasSubmitted ? '1px solid rgb(246, 94, 94)' : ''}}>
                                        {typeof imagePath === 'object' ? <span className="name-ellipsis">{imagePath.name}</span> : <img className='edit-photo-preview' src={imagePath}></img>}
                                        <label className="imagePath-input-label">
                                            {/* {imagePath ? imagePath : 'No image chosen'} */}
                                            <div>
                                                <i className="fa-solid fa-camera"></i>
                                                Replace image
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
                        <div className='edit-description-div'>
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
                                <button onClick={() => history.push(`/tracks/${trackId}`)}>Cancel</button>
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

export default UpdateTrackForm;
