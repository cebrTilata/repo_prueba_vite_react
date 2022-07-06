import { Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faArrowAltCircleDown} from '@fortawesome/free-regular-svg-icons';

import "./styles/headering.css";

const Headering = ( {user} ) => {

    let userName = JSON.parse(window.localStorage.getItem("userSession")).name;

    return(
        <Fragment>
            <div className="headering">

                <div className="headering__gradient1"></div>

                <h2 className="headering__saludo">Bienvenid@ { userName.split(" ")[0] } </h2>

                <div className="headering__user">

                    <FontAwesomeIcon className="headering__iconUser" icon={ faUserCircle }/>

                    <p className="headering__nombre">{ userName }</p>

                    <FontAwesomeIcon className="headering__iconDown" icon={ faArrowAltCircleDown }/>

                </div>

            </div>
        </Fragment>
    )
};

export default Headering;