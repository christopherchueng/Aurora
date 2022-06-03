import { useState } from "react";
import DeleteTrackComponent from "./DeleteTrackComponent";
import { Modal } from '../../context/Modal'
// import './Modal.css'

const DeleteTrackModal = ({ track }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                Delete
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteTrackComponent showModal={showModal}/>
                </Modal>
            )}
        </>
    )
}

export default DeleteTrackModal;
