import { createContext, useContext, useState } from 'react';

export const trackContext = createContext();

export const useTrackContext = () => useContext(trackContext);

export default function TrackProvider({ children }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isShuffled, setIsShuffled] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)


    return (
        <trackContext.Provider value={{
            isPlaying,
            setIsPlaying,
            isShuffled,
            setIsShuffled,
            currentTime,
            setCurrentTime
        }}>
            { children }
        </trackContext.Provider>
    );
}
