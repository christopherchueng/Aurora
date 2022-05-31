import { useState, useEffect } from 'react';
import './TrackIdPage.css';

const TrackIdPage = () => {
    const [isPlaying, setisPlaying] = useState(false)

    const playBtn = document.querySelector('.play')
    // playBtn.addEventListener('click', () => {
    //     console.log('here')
    // })

    useEffect(() => {
        setisPlaying(!isPlaying)
    }, [])


    return (
        <div className='music-player-ctn'>
            <div className='music-player-content'>
                <div className='track-bar'>

                </div>
                <div className='media-controls'>
                    <div className='back-ctn'>
                        <button className='back'><i className="fa-solid fa-caret-left fa-4x"></i></button>
                    </div>
                    <div className='play-ctn'>
                        {!isPlaying && <button className='play'><i className="fa-solid fa-circle-play fa-10x"></i></button>}
                        {isPlaying && <button className='pause'><i className="fa-solid fa-circle-pause fa-10x"></i></button>}
                    </div>
                    <div className='next-ctn'>
                        <button className='next'><i className="fa-solid fa-caret-right fa-4x"></i></button>
                    </div>
                    <div className='volume-ctn'>
                        <i class="fa-thin fa-dash"></i>
                    </div>
                </div>
            </div>
        <div className='comment-section-ctn'>
            <h1>Comments down below</h1>
        </div>

        </div>
    )
}

export default TrackIdPage;
