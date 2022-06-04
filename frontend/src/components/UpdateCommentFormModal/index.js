import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UpdateCommentForm from './UpdateCommentForm';

function UpdateCommentFormModal ({ comment, user, trackId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className='updateCmtModal-btn'
        onClick={() => setShowModal(true)}>
            <i className="fa-solid fa-pen"></i>
        </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateCommentForm comment={comment} user={user} trackId={trackId} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default UpdateCommentFormModal ;
