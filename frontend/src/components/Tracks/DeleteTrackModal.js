import { useState } from "react";
import DeleteTrackComponent from "./DeleteTrackComponent";
import { Modal } from '../../context/Modal'
// import './Modal.css'

const DeleteTrackModal = ({ track }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="delete-track-modal-ctn">
            <button className='track-delete-btn' onClick={() => setShowModal(true)}>
                <i className="fa-solid fa-trash fa-2xl"></i>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteTrackComponent showModal={showModal} setShowModal={setShowModal} />
                </Modal>
            )}
        </div>
    )
}

export default DeleteTrackModal;
