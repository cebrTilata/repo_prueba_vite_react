import { Fragment, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ShowModalContext from "../../../../../context/showModalContext";

import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

import "./styles/modal.css";

const Modal = () => {

    const { setShowModal } = useContext(ShowModalContext);

    const funcCerrar = () => {

        setShowModal(false);

        const body = document.querySelector("body");

        body.style.overflowY="scroll";

    };

    return (
        <Fragment>
            <div className="modal__Container">
            </div>
            
            <div className="modal">
                <div className="modal__top">
                    <p className="modal_p">Ventana De Edicion</p>
                    <FontAwesomeIcon className="modal_close" icon={faCircleXmark} onClick={funcCerrar} />
                </div>

                <div className="modal__body">

                    <form className="modal__form">
                        <label>Campo 1</label>
                        <input type="text"></input>
                        <label>Campo 2</label>
                        <input type="text"></input>
                        <label>Campo 3</label>
                        <textarea></textarea>
                    </form>

                    <div className="modal__group">
                        <button className="modal-btnPri" type="submit">Actualizar</button>
                        <button className="modal-btnSec" type="reset">Limpiar</button>
                    </div>
                </div>

            </div>
        </Fragment>
    );
}

export default Modal;