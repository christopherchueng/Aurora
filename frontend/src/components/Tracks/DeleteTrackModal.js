import { useState } from "react";
import DeleteTrackComponent from "./DeleteTrackComponent";
import { Modal } from '../../context/Modal'
// import './Modal.css'

const DeleteTrackModal = ({ track }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                <i className='fa-solid fa-trash-can'></i>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteTrackComponent />
                </Modal>
            )}
        </>
    )
}

export default DeleteTrackModal;
