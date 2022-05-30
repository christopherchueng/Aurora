import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import { getTracks } from '../../store/trackReducer';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './SplashPage.css'

const SplashPage = () => {
    const dispatch = useDispatch();
    const tracks = useSelector(state => state.track.entries)

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
                        <div className='splash-upload-img'>

                        </div>
                        <div className='splash-upload-text'>
                            Upload your tracks.
                        </div>
                    </div>
                    <div className='splash-listen'>
                        <div className='splash-listen-img'>

                        </div>
                        <div className='splash-listen-text'>
                            Play. Listen. Repeat.
                        </div>
                    </div>
                    <div className='splash-connect'>
                        <div className='splash-connect-img'>

                        </div>
                        <div className='splash-connect-text'>
                            Connect with other creators.
                        </div>
                    </div>
                </div>
                <div className='splash-upload-btn'>
                    <button type='button'>Upload your own</button>
                </div>
                <div className='track-content'>
                    <div className='splash-track-header'>
                        <span>
                            Hear what’s trending for free in the Aurora community
                        </span>
                    </div>
                    <div className='splash-track-grid'>
                        <ul>
                            {Object.values(tracks).map(({ id, title, userId, trackPath, imagePath }) => (
                                <li key={id}>
                                    <NavLink to={`/tracks/${id}`}>
                                        <img src={imagePath} className='grid-image'></img>
                                        <div className='splash-track-title'>
                                            <span>{title}</span>
                                        </div>
                                    </NavLink>
                                    <div className='splash-track-artist'>
                                        <span>{userId}</span>
                                    </div>
                                    <audio controls src={trackPath}></audio>
                                </li>
                            ))}
                        </ul>

                    </div>
                    <div className='splash-closing-remarks'>
                        <h1>Get on track with Aurora now.</h1>
                        <div className='remarks-btns'>
                            <SignupFormModal />
                            <button type='submit'>Demo User</button>
                        </div>
                        <div className='bottom-sign-in'></div>
                            <span>Already have an account?
                                <LoginFormModal />
                            </span>
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
