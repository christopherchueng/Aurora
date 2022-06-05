import { useState } from "react";
import DeleteComment from "./DeleteComment";
import { Modal } from '../../context/Modal'
// import './Modal.css'

const DeleteCommentModal = ({ commentId }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}>
                <i className="fa-solid fa-trash"></i>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteComment showModal={showModal} commentId={commentId}/>
                </Modal>
            )}
        </>
    )
}

export default DeleteCommentModal;
