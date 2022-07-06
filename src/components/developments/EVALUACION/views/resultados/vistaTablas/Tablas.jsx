import { Fragment } from 'react';
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from 'uuid';

import textShorting from "../../../../../../helpers/textShorting";

import "./tablas.css";

const Tablas = ({ datos }) => {

    const navigate = useNavigate();

    //TIENE TODA LA PINTA DE SER UN COMPONENTE...
    function Cabezera(seccion, pregunta){
        
        return(
            <Fragment key={uuidv4()}>
                <thead key={uuidv4()}>
                    <tr key={uuidv4()}>
                        <td key={uuidv4()} className='tabla__columna__titulo'>Pregunta</td>
                        {Object.entries(pregunta).map((calificador, index) => {


                            if(index>=2)
                            {
                                if(seccion.type_name === "Funciones"){
                                    if(index%2===0)
                                    {
                                        return(
                                            <Fragment key={uuidv4()}>
                                                <td key={uuidv4()} className='tabla__columna__titulo'>{textShorting(calificador[0])}</td>
                                            </Fragment>
                                        )
                                    }
                                }else{
                                    return(
                                        <Fragment key={uuidv4()}>
                                            <td key={uuidv4()} className='tabla__columna__titulo'>{textShorting(calificador[0])}</td>
                                        </Fragment>
                                    )
                                }
                                
                            }
                        })
                        }
                        
                    </tr>
                </thead>
            </Fragment>
        )

    }

    return(
        <>
            {
                datos ?
                    <section className="dashboard__tablas" key={uuidv4()}>
                        {
                        Object.entries(datos).map((dato) => {
                            return(
                                <Fragment key={uuidv4()}>
                                {
                                    dato[0] === "detail" ?
                                    dato[1].map( (seccion, idx) => {
                                    return(
                                        <div key={uuidv4()} className={(idx === 0 ? "container__tabla-grande" : "container__tabla")}>
                                        {/*ACA VA EL NOMBRE*/}
                                        <h3 key={uuidv4()} className='tabla__titulo'>{seccion.type_name}</h3>
                                        {/*ACA DEBE IR LA TABLA CORRESPODIENTE A CADA SECCIÓN*/}
                                        <table key={uuidv4()} className='tabla'>
                                            {seccion.questions.map( (pregunta, idx) => {
                                                return(
                                                    <Fragment key={uuidv4()}>
                                                    {/*ITERANDO UNA SOLA VEZ LOS HEADERS*/}
                                                        {idx === 0 ?
                                                        Cabezera(seccion, pregunta)
                                                            :
                                                        null
                                                        }
                                                    {/*ITERANDO EL CONTENIDO DE LA TABLA*/}
                                                        <Fragment key={uuidv4()}>
                                                            <tbody key={uuidv4()}>
                                                                <tr key={uuidv4()}>
                                                                <td key={uuidv4()} className='tabla__dato'>{pregunta.name}</td>
                                                                {Object.entries(pregunta).map((key, idx) => {
                                                                    if(key[0] != "name" && key[0]!="id" && key[0].includes("value")){
                                                                        return(
                                                                            <>
                                                                                <td key={uuidv4()} className='tabla__dato'>{key[1]}</td>
                                                                            </>
                                                                        )
                                                                    }
                                                                })}
                                                                </tr>
                                                            </tbody>
                                                        </Fragment>
                                                    
                                                    </Fragment>
                                                )

                                            })}
                                        </table>
                                        </div>
                                    )
                                    })
                                    :
                                    null
                                }
                                </Fragment>
                            )
                        })
                        }
                    </section>
                :
                    navigate("/evaluacion/resultados")
            }
        </>
    )
}

export default Tablas;