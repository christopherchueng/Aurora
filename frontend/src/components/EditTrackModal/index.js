import React, { useState } from 'react';
import { EditFormModal } from '../../context/EditFormModal';
import './EditTrackModal.css';

function EditTrackModal() {
  const [openEditTrack, setOpenEditTrack] = useState(false);
  const [value, setValue] = useState()
  const onChange = e => setValue(e.target.value)

  return (
    <>
      <button className='editTrack-modal' onClick={() => setOpenEditTrack(true)}>Edit</button>
      {openEditTrack && (
        <EditFormModal onClose={() => setValue()}>

        </EditFormModal>
      )}
    </>
  );
}

export default EditTrackModal;
