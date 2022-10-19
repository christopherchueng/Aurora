import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const DiscoverTracks = ({track}) => {
    const playing = useSelector(state => state?.mediaControl?.playing)
    const [isPlaying, setIsPlaying] = useState(!!playing)

    const audioPlayer = useRef()

    useEffect(() => {
        if (isPlaying) {
            audioPlayer?.current?.play()
            // progressAnimation.current = requestAnimationFrame(currentlyPlaying)
        } else {
            audioPlayer?.current?.pause()
            // cancelAnimationFrame(progressAnimation.current)
        }
    }, [isPlaying])

    return (
        <div className='playlistTrack-content'>
            <div className='playlistTrack-info'>
                <div className="playlistTrack-trackPath">
                    <audio src={track.trackPath} ref={audioPlayer}></audio>
                </div>
                <div className="playlistTrack-imagePath">
                    <div className="play-playlistTrack-ctn">
                        <button
                            type='button'
                            className='play-pause-playlistTrack'
                            onClick={() => setIsPlaying(!isPlaying)}
                        >
                            {isPlaying
                            ? <i className="fa-solid fa-circle-pause fa-4x"></i>
                            : <i className="fa-solid fa-circle-play fa-4x"></i>
                            }
                        </button>
                    </div>
                    <img className='playlistTrack-cover-photo' src={track.imagePath}></img>
                </div>
                <div className='playlistTrack-title-artist flex-col'>
                    <div className='playlistTrack-title'>
                        {track.title}
                    </div>
                    <div className='playlistTrack-artist'>
                        {track.User?.username}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiscoverTracks
