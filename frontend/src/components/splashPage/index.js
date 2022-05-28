import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './SplashPage.css'

const SplashPage = () => {
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
                        <li className='splash-track-item'>
                            <Link to=''>Image Link here</Link>
                                {/* Background image */}
                                <span>Image here</span>
                                <button>Play Button on top of Image</button>
                            <div className='splash-track-title'>
                                <span>Title here</span>
                            </div>
                            <div className='splash-track-artist'>
                                <span>Artist here</span>
                            </div>
                        </li>
                        <li className='splash-track-item'>
                            <Link to=''>Image Link here</Link>
                                {/* Background image */}
                                <span>Image here</span>
                                <button>Play Button on top of Image</button>
                            <div className='splash-track-title'>
                                <span>Title here</span>
                            </div>
                            <div className='splash-track-artist'>
                                <span>Artist here</span>
                            </div>
                        </li>
                        <li className='splash-track-item'>
                            <Link to=''>Image Link here</Link>
                                {/* Background image */}
                                <span>Image here</span>
                                <button>Play Button on top of Image</button>
                            <div className='splash-track-title'>
                                <span>Title here</span>
                            </div>
                            <div className='splash-track-artist'>
                                <span>Artist here</span>
                            </div>
                        </li>
                        <li className='splash-track-item'>
                            <Link to=''>Image Link here</Link>
                                {/* Background image */}
                                <span>Image here</span>
                                <button>Play Button on top of Image</button>
                            <div className='splash-track-title'>
                                <span>Title here</span>
                            </div>
                            <div className='splash-track-artist'>
                                <span>Artist here</span>
                            </div>
                        </li>
                        <li className='splash-track-item'>
                            <Link to=''>Image Link here</Link>
                                {/* Background image */}
                                <span>Image here</span>
                                <button>Play Button on top of Image</button>
                            <div className='splash-track-title'>
                                <span>Title here</span>
                            </div>
                            <div className='splash-track-artist'>
                                <span>Artist here</span>
                            </div>
                        </li>
                        <li className='splash-track-item'>
                            <Link to=''>Image Link here</Link>
                                {/* Background image */}
                                <span>Image here</span>
                                <button>Play Button on top of Image</button>
                            <div className='splash-track-title'>
                                <span>Title here</span>
                            </div>
                            <div className='splash-track-artist'>
                                <span>Artist here</span>
                            </div>
                        </li>
                        <li className='splash-track-item'>
                            <Link to=''>Image Link here</Link>
                                {/* Background image */}
                                <span>Image here</span>
                                <button>Play Button on top of Image</button>
                            <div className='splash-track-title'>
                                <span>Title here</span>
                            </div>
                            <div className='splash-track-artist'>
                                <span>Artist here</span>
                            </div>
                        </li>
                        <li className='splash-track-item'>
                            <Link to=''>Image Link here</Link>
                                {/* Background image */}
                                <span>Image here</span>
                                <button>Play Button on top of Image</button>
                            <div className='splash-track-title'>
                                <span>Title here</span>
                            </div>
                            <div className='splash-track-artist'>
                                <span>Artist here</span>
                            </div>
                        </li>
                        <li className='splash-track-item'>
                            <Link to=''>Image Link here</Link>
                                {/* Background image */}
                                <span>Image here</span>
                                <button>Play Button on top of Image</button>
                            <div className='splash-track-title'>
                                <span>Title here</span>
                            </div>
                            <div className='splash-track-artist'>
                                <span>Artist here</span>
                            </div>
                        </li>
                        <li className='splash-track-item'>
                            <Link to=''>Image Link here</Link>
                                {/* Background image */}
                                <span>Image here</span>
                                <button>Play Button on top of Image</button>
                            <div className='splash-track-title'>
                                <span>Title here</span>
                            </div>
                            <div className='splash-track-artist'>
                                <span>Artist here</span>
                            </div>
                        </li>
                        <li className='splash-track-item'>
                            <Link to=''>Image Link here</Link>
                                {/* Background image */}
                                <span>Image here</span>
                                <button>Play Button on top of Image</button>
                            <div className='splash-track-title'>
                                <span>Title here</span>
                            </div>
                            <div className='splash-track-artist'>
                                <span>Artist here</span>
                            </div>
                        </li>
                        <li className='splash-track-item'>
                            <Link to=''>Image Link here</Link>
                                {/* Background image */}
                                <span>Image here</span>
                                <button>Play Button on top of Image</button>
                            <div className='splash-track-title'>
                                <span>Title here</span>
                            </div>
                            <div className='splash-track-artist'>
                                <span>Artist here</span>
                            </div>
                        </li>

                    </div>
                    <div className='splash-closing-remarks'>
                        <h1>Get on track with Aurora now.</h1>
                        <div className='remarks-btns'>
                            <button type='submit'>Create account</button>
                            <button type='submit'>Demo User</button>
                        </div>
                        <div className='bottom-sign-in'></div>
                            <span>Already have an account?<button>Sign in</button></span>
                    </div>
                </div>
            </div>
            <footer>
                <a href='/https://javascript.plainenglish.io/'>Javascript</a>
                •
                <a href='/https://expressjs.com/'>Express</a>
                •
                <a href='/https://www.postgresql.org/'>PostgreSQL</a>
                •
                <a href='https://reactjs.org/'>React</a>
                •
                <a href='/https://redux.js.org/'>Redux</a>
                •
                <a href='/https://html.com/'>HTML</a>
                •
                <a href='/https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps/What_is_CSS'>CSS</a>
                •
                <a href='/https://git-scm.com/'>Git</a>
            </footer>
        </>
    )
}

export default SplashPage;
