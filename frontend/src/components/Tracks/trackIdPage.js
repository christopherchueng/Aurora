import { useState, useEffect } from 'react';
import './TrackIdPage.css';

const TrackIdPage = () => {
    const [isPlaying, setIsPlaying] = useState(true)


    return (
        <div className='music-player-ctn'>
            <div className='music-player-content'>
                <div className='track-bar'>

                </div>
                <div className='media-controls'>
                    <div className='control-left'>
                        {/* Dead Space */}
                    </div>
                    <div className='control-center'>
                        <div className='back-ctn'>
                            <button className='back'><i className="fa-solid fa-caret-left fa-3x"></i></button>
                        </div>
                        <div className='play-ctn'>
                            {/* If not playing, play button will display */}
                            {!isPlaying && (<button className='play' onClick={() => setIsPlaying(!isPlaying)}><i className="fa-solid fa-circle-play fa-7x"></i></button>)}
                            {/* If playing, pause button will display */}
                            {isPlaying && (<button className='pause' onClick={() => setIsPlaying(!isPlaying)}><i className="fa-solid fa-circle-pause fa-7x"></i></button>)}
                        </div>
                        <div className='next-ctn'>
                            <button className='next'><i className="fa-solid fa-caret-right fa-3x"></i></button>
                        </div>

                    </div>
                    <div className='volume-ctn'>
                        Volume line here
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
