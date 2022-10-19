import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
                            ? <i className="fa-solid fa-circle-pause fa-4x fontA-pause"></i>
                            : <i className="fa-solid fa-circle-play fa-4x fontA-play"></i>
                            }
                        </button>
                    </div>
                    <Link to={`/tracks/${track.id}`}><img className='playlistTrack-cover-photo' src={track.imagePath}></img></Link>
                </div>
                <div className='playlistTrack-title-artist flex-col'>
                    <div className='playlistTrack-title'>
                        <Link to={`/tracks/${track.id}`}>{track.title}</Link>
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
