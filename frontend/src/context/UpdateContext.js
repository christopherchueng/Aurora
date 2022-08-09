import { createContext, useContext, useState } from 'react';

export const updateContext = createContext();

export const useUpdateContext = () => useContext(updateContext);

export default function UpdateProvider({ children }) {
    const [openEditTrack, setOpenEditTrack] = useState(false);

    return (
        <updateContext.Provider value={{
            openEditTrack,
            setOpenEditTrack
        }}>
            { children }
        </updateContext.Provider>
    );
}
