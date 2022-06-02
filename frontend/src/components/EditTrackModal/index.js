import React, { useState } from 'react';
import { EditFormModal } from '../../context/EditFormModal';
import './EditTrackModal.css';

function EditTrackModal() {
  const [openEdit, setOpenEdit] = useState(false);
  const [value, setValue] = useState()
  const onChange = e => setValue(e.target.value)

  return (
    <>
      <button className='editTrack-modal' onClick={() => setOpenEdit(true)}>Edit</button>
      {openEdit && (
        <EditFormModal onClose={() => setValue()}>

        </EditFormModal>
      )}
    </>
  );
}

export default EditTrackModal;
