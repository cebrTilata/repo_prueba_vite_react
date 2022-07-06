import { useState } from "react";

import CampoFormulario from "../campoFormulario/CampoFormulario";

import { v4 as uuidv4 } from "uuid";

const ContenedorFormulario = ({ arreglo, nombreTemporalidad, objetoSeleccionado }) => {

    const [temporalidad, setTemporalidad] = useState(nombreTemporalidad);
    const [objeto, setObjeto] = useState(objetoSeleccionado);
    const [array, setArray] = useState(objetoSeleccionado);

    return (
        <>
            {
                array.map((valor, idx) => {
                    return (
                        <CampoFormulario
                            key={uuidv4()}
                            identificador={idx}
                            nombre={temporalidad[idx]}
                            opciones={objeto.units}
                        ></CampoFormulario>
                    );
                })
            }
        </>
    )
}

export default ContenedorFormulario