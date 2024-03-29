import React, { useState } from "react";
import SignupForm from "./SignupForm";
import { Modal } from '../../context/Modal'

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='signup-modal-ctn'>
      <button className='signupModal-btn' onClick={() => setShowModal(true)}>Sign up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </div>
  )
}

export default SignupFormModal;
