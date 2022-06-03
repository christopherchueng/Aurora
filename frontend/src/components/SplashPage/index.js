import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import { getTracks } from '../../store/trackReducer';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './SplashPage.css'

const SplashPage = () => {
    const dispatch = useDispatch();
    const mostRecentTracks = useSelector(state => {
        const tracksObj = Object.values(state.track.entries)
        return tracksObj.slice(tracksObj.length - 12)
    })

    useEffect(() => {
        dispatch(getTracks())
    }, [dispatch]);

    return (
        <>
            <div className='splash-ctn'>
                <div className='home-banner-ctn'>
                    <h1 className='banner-header'>Aurora</h1>
                </div>
                <div className='splash-features'>
                    <div className='splash-upload'>
                        <div className='splash-upload-text'>
                            Upload your tracks.
                        </div>
                        <div className='upload-img-ctn'>
                            {/* <img className='upload-img' src='/images/upload-your-tracks.jpeg'></img> */}
                            <img className='upload-img' src={process.env.PUBLIC_URL + '/images/upload-your-tracks.jpeg'}></img>
                        </div>
                    </div>
                    <div className='splash-listen'>
                        <div className='listen-img-ctn'>
                        {/* <img className='listen-img' src='/images/play-listen-repeat.jpg'></img> */}
                        <img className='listen-img' src={process.env.PUBLIC_URL + '/images/play-listen-repeat.jpg'}></img>
                        </div>
                        <div className='splash-listen-text'>
                            <p>Play. Listen. Repeat.</p>
                        </div>
                    </div>
                    <div className='splash-connect'>
                        <div className='splash-connect-text'>
                            Connect with other creators.
                        </div>
                        <div className='connect-img-ctn'>
                            {/* <img className='connect-img' src='/images/connect-with-creators.jpeg'></img> */}
                            <img className='connect-img' src={process.env.PUBLIC_URL + '/images/connect-with-creators.jpeg'}></img>
                        </div>
                    </div>
                </div>
                <div className='splash-upload-btn'>
                    <Link to='/tracks/upload' title='Upload your own'>Upload your own</Link>
                </div>
                <div className='track-content'>
                    <div className='splash-track-header'>
                        <span>
                            <h2>Hear the latest tracks in the Aurora community</h2>
                        </span>
                    </div>
                    <div className='splash-track-grid'>
                        <ul>
                            {mostRecentTracks.reverse().map(({ id, title, User, trackPath, imagePath }) => (
                                <li key={id} className='track-container'>
                                    <NavLink to={`/tracks/${id}`}>
                                        <img src={imagePath} className='grid-image'></img>
                                    </NavLink>
                                        <div className='splash-track-title'>
                                            <Link to={`/tracks/${id}`}>{title}</Link>
                                        </div>
                                    <div className='splash-track-artist'>
                                        {User.username}
                                    </div>
                                </li>
                            ))}
                        </ul>

                    </div>
                    <div className='splash-closing-remarks'>
                        <h2>Get on track with Aurora now.</h2>
                        <div className='remarks-btns'>
                            <SignupFormModal />
                            <button className='signupModal-btn' type='submit'>Demo</button>
                        </div>
                        <div className='bottom-sign-in'></div>
                            <div className='account-inquiry-span'>
                                <span>Already have an account?</span>
                                <LoginFormModal />
                            </div>
                    </div>
                </div>
            </div>
            <footer>
                <a href='https://javascript.plainenglish.io/'>Javascript</a>
                •
                <a href='https://expressjs.com/'>Express</a>
                •
                <a href='https://www.postgresql.org/'>PostgreSQL</a>
                •
                <a href='https://sequelize.org/'>Sequelize</a>
                •
                <a href='https://reactjs.org/'>React</a>
                •
                <a href='https://redux.js.org/'>Redux</a>
                •
                <a href='https://html.com/'>HTML</a>
                •
                <a href='https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS'>CSS</a>
                •
                <a href='https://git-scm.com/'>Git</a>
            </footer>
        </>
    )
}

export default SplashPage;
