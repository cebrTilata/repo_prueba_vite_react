import React from 'react';

import GeneradorGrafica from '../GeneradorGrafica/GeneradorGrafica';
import style from "./seccionPrevisualizar.module.css";

const SeccionPrevisualizar = ( {graficaSelecta} ) => {
    return (
        <section className={style.contenedor__grafica}>
            {
                graficaSelecta ?
                    <div className={style.informacion}>
                        <label>Descripción de la grafica:</label>
                        <textarea spellcheck="false" value={graficaSelecta.chart_description} className={style.informacion__textarea}></textarea>
                    </div>
                    :
                    null
            }
            <div className={style.area__grafica}>
                <GeneradorGrafica datos={graficaSelecta} />
            </div>
        </section>
    )
}

export default SeccionPrevisualizar;