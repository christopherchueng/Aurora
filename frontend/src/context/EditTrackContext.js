import { createContext, useContext, useState } from 'react';

export const EditTrackContext = createContext();

export const useEditTrackContext = () => useContext(EditTrackContext);

export default function EditTrackProvider({ children }) {
    const [openEdit, setOpenEdit] = useState(true);
    const [saveChanges, setSaveChanges] = useState(false);

    return (
        <EditTrackContext.Provider value={{openEdit, setOpenEdit, saveChanges, setSaveChanges}}>
            { children }
        </EditTrackContext.Provider>
    );
}
