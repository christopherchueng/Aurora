import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTracks, updateTrack } from '../../store/trackReducer';
import { genres } from "../../utils/genreData";
import DeleteTrackComponent from './DeleteTrackComponent';
import UpdateTrackForm from './UpdateTrackForm';
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../FormTemplate/ErrorMessage'
import './TrackIdPage.css';

const TrackIdPage = ({tracks}) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const { trackId } = useParams();
    const track = tracks[trackId];
    // const tracks = useSelector(state => state.track.entries)
    // Tomorrow, think about making a tracks index to pass track as a prop.
    // const track = Object.values(tracks).find(track => track.id === +trackId)
    // console.log(track['title'])
    console.log('-----------inTrackIdPage-----------', track);

    const [title, setTitle] = useState(track.title)
    const [description, setDescription] = useState(track.description)
    const [genre, setGenre] = useState(track.genre)
    const [imagePath, setImagePath] = useState(track.imagePath)
    const [errors, setErrors] = useState({});
    // const [value, setValue] = useState();
    const [openEdit, setOpenEdit] = useState(false);
    const [saveChanges, setSaveChanges] = useState(true)
    const [isPlaying, setIsPlaying] = useState(true)

    // const track = Object.values(tracks).find(track => track.id === +trackId)

    useEffect(() => {
        dispatch(getTracks())
    }, [dispatch])

    useEffect(() => {
        const validationErrors = {};
        if (!title) {
            validationErrors.title = 'Please provide a title.'
        }
        if (!genre) {
            validationErrors.genre = 'Please select a genre.'
        }

        setErrors(validationErrors);

    }, [title, genre])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title,
            description,
            genre,
            imagePath,
        }

        const updatedTrack = await dispatch(updateTrack(payload))
        if (updatedTrack) {
            setErrors({})
            setOpenEdit(false);
            setSaveChanges(true);
            history.push(`/tracks/${updatedTrack.id}`)
        }
    }

    return (
        <>
            {/* <form onSubmit={handleSubmit}> */}
                <div className='music-player-ctn'>
                    <div className='music-player-content'>
                        <div className='track-bar'>
                            {/* <form onSubmit={handleSubmit}> */}
                                <div className='cover-photo-ctn'>
                                    {(!openEdit && (<img className='cover-photo' src={track?.imagePath}></img>)) ||
                                    (openEdit && <input
                                        name='imagePath'
                                        type='text'
                                        alt='https://aurora-tracks.s3.amazonaws.com/Aurora-Tracks/default-imagePath.png'
                                        value={imagePath}
                                        placeholder='Insert an image link'
                                        onChange={e => setImagePath(e.target.value)}
                                    />)}
                                </div>
                            {/* </form> */}
                        </div>
                        <div className='media-controls'>
                            <div className='control-left'>
                                {/* <form onSubmit={handleSubmit}> */}
                                    <div className='track-title'>
                                        <h1>
                                            {(!openEdit && (title)) ||
                                            (openEdit && <input
                                                type='text'
                                                aria-label='Title'
                                                value={title}
                                                onChange={e => setTitle(e.target.value)}
                                            />)}
                                        </h1>
                                    </div>
                                    <div>
                                        {saveChanges && <ErrorMessage error={errors.title} />}
                                    </div>
                                {/* </form> */}
                                <div className='track-artist'>
                                    <p>{track?.User?.username}</p>
                                </div>
                            </div>
                            <div className='control-center'>
                                <div className='back-ctn'>
                                    <button type='button' className='back'><i className="fa-solid fa-backward-step fa-3x"></i></button>
                                </div>
                                <div className='play-ctn'>
                                    {/* If not playing, play button will display */}
                                    {!isPlaying && (<button type='button' className='play' onClick={() => setIsPlaying(!isPlaying)}><i className="fa-solid fa-circle-play fa-7x"></i></button>)}
                                    {/* If playing, pause button will display */}
                                    {isPlaying && (<button type='button' className='pause' onClick={() => setIsPlaying(!isPlaying)}><i className="fa-solid fa-circle-pause fa-7x"></i></button>)}
                                </div>
                                <div className='next-ctn'>
                                    <button type='button' className='next'><i className="fa-solid fa-forward-step fa-3x"></i></button>
                                </div>

                            </div>
                            <div className='volume-ctn'>
                                Volume line here
                            </div>
                        </div>
                    </div>
                <div className='adjustment-ctn'>
                    <form onSubmit={handleSubmit}>
                        <div className='edit-ctn'>
                            {!openEdit &&
                            (<button
                                type='button'
                                className='inline-edit-Track'
                                onClick={() => setOpenEdit(true) &&
                                setSaveChanges(false)}>
                                    Edit
                            </button>)}
                            {openEdit &&
                            (<button
                                type='submit'
                                className='saveChanges'
                                onClick={() => setOpenEdit(false) &&
                                setSaveChanges(true)}>
                                    Save Changes
                            </button>)}
                        </div>
                    </form>
                    <div className='delete-ctn'>
                        <DeleteTrackComponent trackId={trackId} />
                    </div>
                </div>
                    <div className='track-info-ctn'>
                        {/* <form onSubmit={handleSubmit}> */}
                            <div className='description'>
                                {(!openEdit && (description)) ||
                                (openEdit && (<textarea
                                    name='description'
                                    value={description}
                                    placeholder='Description'
                                    onChange={e => setDescription(e.target.value)}
                                />))}
                            </div>
                            <div>
                                {saveChanges && <ErrorMessage error={errors.description} />}
                            </div>
                        {/* </form> */}
                            <div className='genre-ctn'>
                                {/* <form onSubmit={handleSubmit}> */}
                                    <div className='genre'>
                                        {/* {track?.genre} */}
                                        {(!openEdit && (genre)) ||
                                        (openEdit &&
                                        (<select
                                            type='text'
                                            aria-label='Title'
                                            value={genre}
                                            onChange={e => setGenre(e.target.value)}
                                        >
                                            {genres.map(genre => (
                                                <option key={genre}>{genre}</option>
                                            ))}
                                        </select>)
                                        )}
                                    </div>
                                    <div>
                                        {saveChanges && <ErrorMessage error={errors.genre} />}
                                    </div>
                                {/* </form> */}
                            </div>
                    </div>
                </div>
            {/* </form> */}
                <div className='comment-section-ctn'>
                    <h1>Comments down below</h1>
                </div>
        </>
    )
}

export default TrackIdPage;
