import { createContext, useContext, useState } from 'react';

export const updateContext = createContext();

export const useUpdateContext = () => useContext(updateContext);

export default function UpdateProvider({ children }) {
    const [openEditTrack, setOpenEditTrack] = useState(false);
    const [openEditCmt, setOpenEditCmt] = useState(false);
    const [saveChanges, setSaveChanges] = useState(false);
    const [boxClicked, setBoxClicked] = useState(false)

    return (
        <updateContext.Provider value={{
            openEditTrack,
            setOpenEditTrack,
            saveChanges,
            setSaveChanges,
            openEditCmt,
            setOpenEditCmt,
            boxClicked,
            setBoxClicked
        }}>
            { children }
        </updateContext.Provider>
    );
}
