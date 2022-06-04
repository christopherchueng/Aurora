import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpdateCommentForm from './UpdateCommentForm';

function UpdateCommentFormModal () {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='updateCmtModal-btn' onClick={() => setShowModal(true)}>Log in</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateCommentForm />
        </Modal>
      )}
    </>
  );
}

export default UpdateCommentFormModal ;
