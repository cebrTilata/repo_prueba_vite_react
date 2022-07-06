import { useState } from "react";

import {v4 as uuidv4} from "uuid";

const CampoFormulario = ({ datos, nombre, padre }) => {

  const [estadoOpciones, setEstadoOpciones]= useState( () => {return datos.filter((objeto) => objeto.id === padre)[0]});

  console.log("estadoOpciones", estadoOpciones);

  /* console.log("Estado desde CampoFomulario", datos); */

  return (
    <div key={uuidv4()}>
      <input key={uuidv4()} name="name" defaultValue={nombre}></input>
      <select key={uuidv4()} name="parent_unit_id">
        <option key={uuidv4()} defaultValue={null}></option>
        {
          estadoOpciones.units.map((value) => {
            return <option key={uuidv4()} value={value.type_temporality_id}>{value.name}</option>
          })
        }
      </select>
      <input key={uuidv4()} name="days" type="text"></input>
    </div>
  )
}

export default CampoFormulario;