import { Fragment } from "react";

import style from "./indicador.module.css";

const Indicador = ({texto, idx}) => {

    return(

        <div className={style.contenedor}>
            <label>Indicador {idx+1}</label>
            <textarea className={style.resultadosEsperados} defaultValue={texto || ""}></textarea>
        </div>
        
    );
}

export default Indicador;