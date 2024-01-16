import './modal.scss';

import {createPortal} from "react-dom";

const portalRoot = document.getElementById('modal');

const Modal = (props) => {
	const { children, showModal, openModalFunc } = props;

    const portalContent = (
        <div className='bg' onClick={() => {openModalFunc(false)}}>
            <div className='modal-content' onClick={(e) => { e.stopPropagation() }}>
                { children }
            </div>
        </div>
    );
    return showModal ? createPortal(portalContent, portalRoot) : null;
}

export default Modal;