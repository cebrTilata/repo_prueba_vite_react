import { Fragment, useState, useEffect } from "react";
import "./styles/caller.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp ,faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons";

const Filter = () => {

    //FUNCIONES
    const [expandido, setExpandido] = useState(false);

    const isExpand = () => {
        if(expandido){
            setExpandido(false)
        }
        else{
            setExpandido(true)
        }
    }

    return(
        <Fragment>
            {expandido ? 
                <div className="filtro">

                    <FontAwesomeIcon className="filtro__icon clrRed" icon={faArrowCircleUp} onClick={ isExpand }/>

                    <h1 className="clrBlue">Campo De Filtros</h1>

                    <div className="filtro__btnGroup">
                        <button className="filtro__btn bckgrndBlue clrWhite">Aplicar</button>

                        <button className="filtro__btn bckgrndBurgundy clrWhite">Limpiar</button>
                    </div>
                    
                </div>
            : 
                <div className="filtro">
                    <FontAwesomeIcon className="filtro__icon clrGreen" icon={faArrowAltCircleDown} onClick={ isExpand }/>  
                </div>
            }
        </Fragment>
    );
};

export default Filter;