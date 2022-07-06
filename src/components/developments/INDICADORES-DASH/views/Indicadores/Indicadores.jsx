import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { objetosDeOperacion, grupos } from "./fakeData";

import { RiDeleteBack2Fill } from "react-icons/ri";
import { BiAddToQueue } from "react-icons/bi";
import { AiOutlineSave } from "react-icons/ai";

import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/lab/Alert';

import ReactTooltip from 'react-tooltip';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SpinnerTilata from "../../../../SpinnerTilata/SpinnerTilata";

import { axiosGET } from "../../../../../request/axiosGET";
import { axiosPOST } from "../../../../../request/axiosPOST";
import config from "../../../../../controller/controllerRequesting";

import style from "./indicadores.module.css";
import { v4 as uuidv4 } from "uuid";
import lodash from "lodash";
import onlyOneSpace from "../../../../../helpers/onlyOneSpace";
import modal from "./modalListaIndicadores/modalMisIndicadores.jsx";
import vistaPermisos from "../vistaPermisos/vistaPermisos";

const Indicadores = () => {

  const mySwal = withReactContent(Swal);

  const refNumero = useRef(); //REFERENCIA PARA ESTRAER EL NUMERO A AGREGAR A LAS OPERACIONES
  const refGrupos = useRef(); //REFERENCIA AL FORMULARIO EN DONDE SE CHEQUEAN LOS GRUPOS A LOS CUALES SERA VISIBLE EL INDICADOR
  const operaciones = {
    "SUMA": { type_id: 1, type: "operator", name: "+" },
    "RESTA": { type_id: 2, type: "operator", name: "-" },
    "MULTIPLICACION": { type_id: 3, type: "operator", name: "*" },
    "DIVISION": { type_id: 4, type: "operator", name: "/" },
    "(": { type_id: 5, type: "operator", name: "(" },
    ")": { type_id: 6, type: "operator", name: ")" }
  } //ESTE OBJETO SON LAS OPERACIONES QUE SE PUEDEN HACER, CON SU NOMBRE Y EL SIMBOLO QUE APARECE EN EL TABLERO DE OPERACIONES
  const [datos, setDatos] = useState(); //LOS DATOS,ESTOS SE DEBEN CONSULTAR MEDIANTE AXIOS
  const [datosCapturados, setDatosCapturados] = useState({
    name: "",
    description: "",
    definition: [],
    permissions: [],
  }); //ESTE ES EL OBJETO DE DATOS QUE SE TERMINARA ENVIADO AL FINALIZAR LA CREACION DE UN INDICADOR
  const [datosFiltrados, setDatosFiltrados] = useState(); //SIRVE PARA ALMACENAR LOS DATOS QUE SE HAN FILTRADO, SI ES QUE SE HA FILTRADO
  const [elementosOperacion, setElementosOperacion] = useState([]); //ARRAY QUE CONTIENE OPERADORES (+,-,*,/) Y OPERADOS (VARIABLES)
  const [variablesUsadas, setVariablesUsadas] = useState([]);//LISTA LAS VARIABLES QUE HASTA X MOMENTO, SE HAN USADO
  const [raizPermitida, setRaizPermitida] = useState();//LISTA DE ID RAIZ UNICOS QUE SE ESTA USANDO, CON FINALIDAD DE FILTRAR LOS DATOS
  const [loadingButton, setLoadingButton] = useState(false);

  /*EFECTO PARA CONSULTAR LOS DATOS NECESARIOS*/
  useEffect(() => {

    (async function () {
      const respuesta = await axiosGET(import.meta.env.VITE_ENDPOINT_AVALAIBLE_INDICATORS_VARIABLES, config())
      /* const respuesta = objetosDeOperacion */
      setDatos(respuesta);
    })()

  }, [])

  /*ACA HAY UN BUG, SE DEBE DAR EN EL BOTON BORRAR DOS VECES, PARA QUE SE REFRESQUEN LOS DATOS COMO NO FILTRADOS*/
  useLayoutEffect(() => {
    if (raizPermitida) {
      /* console.log("LA RAIZ PERMITIDA ES:", raizPermitida); */
      setDatosFiltrados(datos.filter((ob) => ob.root_id === raizPermitida));
    } else {
      /* console.log("LA RAIZ PERMITIDA ES:", raizPermitida); */
    }
  }, [raizPermitida])


  const anadeDefinicion = () => {
    console.log(elementosOperacion);
    setDatosCapturados({ ...datosCapturados, definition: elementosOperacion });
  }

  /*FUNCION QUE PERMITE AÑADIR OPERADORES Y OPERADOS (VARIABLES,INDICADORES)*/
  const añadeOperacion = (e) => {

    let arrayPaso = elementosOperacion;

    if (e.target.name === "variable") {
      let objetcToAdd = JSON.parse(e.target.getAttribute("datos"));
      objetcToAdd.name = objetcToAdd.name.toUpperCase();

      setVariablesUsadas(
        [
          ...variablesUsadas,
          objetcToAdd
        ]
      )

      setRaizPermitida(objetcToAdd.root_id);

      setElementosOperacion([
        ...elementosOperacion,
        objetcToAdd
      ]);

      /* console.log("objetcToAdd",objetcToAdd) */
      anadeDefinicion();
    }
    else {
      /* arrayPaso.push(operaciones.filter(op => parseInt(op.id)===parseInt(e.target.id))); */
      arrayPaso.push(operaciones[e.target.id]);
      setElementosOperacion([...arrayPaso]);
      anadeDefinicion();
    }


  }

  const añadeOperacionNumero = (e) => {
    if (refNumero.current.value.trim()) {

      /* console.log("El numero añadido:", refNumero.current.value); */

      setElementosOperacion([
        ...elementosOperacion,
        {
          type: "const",
          name: refNumero.current.value
        }
      ]);

      anadeDefinicion();


    }
    refNumero.current.value = "";

    anadeDefinicion();

  }

  const quitaOperacion = (e) => {

    let arrayPaso = elementosOperacion;

    let elementoBorrado = arrayPaso[arrayPaso.length - 1];

    if (lodash.includes(variablesUsadas, elementoBorrado)) {
      let arrayPasoUsadas = variablesUsadas;
      arrayPasoUsadas = arrayPasoUsadas.slice(0, arrayPasoUsadas.length - 1);
      setVariablesUsadas([...arrayPasoUsadas]);
      arrayPaso = arrayPaso.slice(0, arrayPaso.length - 1);
      setElementosOperacion([...arrayPaso]);
      /* setDatosCapturados({ ...datosCapturados, definition:[...arrayPaso]}); //AÑADIDO PARA VALIDAR */
      anadeDefinicion();
    } else {
      arrayPaso = arrayPaso.slice(0, arrayPaso.length - 1);
      setElementosOperacion([...arrayPaso]);
      /* setDatosCapturados({ ...datosCapturados, definition:[...arrayPaso]}); //AÑADIDO PARA VALIDAR */
      anadeDefinicion();
    }

    if (variablesUsadas.length === 0) {
      /* console.log("YA NO HAY VARIABLES PARA OPERAR") */
      setDatosFiltrados(datos);
      setRaizPermitida(null);
      anadeDefinicion();
    }

    anadeDefinicion();

  }

  const creaAtributo = (type_id, name, type, root_id) => {
    let objeto = {
      type_id,
      name,
      type,
      root_id
    }

    return JSON.stringify(objeto);
  }

  const habilitaEnvio = () => {
    let habilitar = datosCapturados.name && datosCapturados.description && (datosCapturados.definition.length > 0) && (datosCapturados.permissions.length > 0) ? false : true;
    /* console.log("HABILITAR", JSON.stringify(habilitar)); */
    return habilitar;
  }



  /*ENVIO DE DATOS, A ACORDAR MAS DETALLADAMENTE CON LAURA*/
  //Sería bueno tambien entre otras validaciones, poder validar que al menos se este operando una variable o indicador
  //Ya que esto no pretende ser una calculadora basica
  const enviarDatos = async () => {

    setLoadingButton(true);

    setDatosCapturados({
      ...datosCapturados,
      definition: elementosOperacion
    });
    await axiosPOST(import.meta.env.VITE_ENDPOINT_SAVE_INDICATOR, { datosCapturados }, config());

    setLoadingButton(false);

  }

  //NO SE PARA QUE ES ESTO, ANALIZARLO Y DEFINIR FUNCION.
  if (elementosOperacion.length <= 0) {

    if (datosFiltrados) {
      setDatosFiltrados(null);
      setRaizPermitida(null);
    }

  }

  /* console.log("Variables usadas", variablesUsadas); */
  /* console.log("Datos capturados", datosCapturados); */
  /* console.log("elementos en la operacion", elementosOperacion); */
  /* console.log("Datos filtrados", datosFiltrados); */
  /* console.log("La raiz permitida es", raizPermitida); */
  /* console.log("EL indicador recibido es", indicador); */
  /* console.log("Las variables usadas son:", variablesUsadas); */


  //**************************** PARTE DE LA VISTA (JSX) *******************************************/
  return (
    <div className={style.contenedor}>
      {
        datos ?
          <>
            <section className={style.creacion__indicadores}>

              {/*AREA DE DEFINICION DEL INDICADOR O LISTA DE INDICADORES CREADOS*/}
              <div className={style.añade__indicadores}>
                <form className={style.formulario}>
                  <label className={style.formulario__label}>Nombre(*)</label>
                  <input name="name" className={style.formulario__input} type="text" onChange={(e) => { onlyOneSpace(e); setDatosCapturados({ ...datosCapturados, [e.target.name]: e.target.value }) }}></input>
                  <label className={style.formulario__label}>Descripción(*)</label>
                  <textarea name="description" className={style.formulario__textarea} onChange={(e) => { onlyOneSpace(e); setDatosCapturados({ ...datosCapturados, [e.target.name]: e.target.value }) }} maxLength={250}></textarea>
                  <div>
                    <button className={style.añade__variable} type="button" onClick={modal}>Mis Indicadores</button>
                    <button className={style.añade__variable} type="button" onClick={() => vistaPermisos(datosCapturados, setDatosCapturados)}>Seleccionar Grupos a Compartir</button>
                  </div>
                </form>
              </div>

              {/*AREA DE OPERADORES*/}
              <div className={style.opera__indicadores}>

                <section className={style.contenedor__operaciones}>
                  <div className={style.tablero__operaciones}>
                    {
                      elementosOperacion.length > 0 ?

                        elementosOperacion.map((operacion) => {
                          if (operacion.name) {
                            return <span className={style.elemento__tablero}>{operacion?.name}</span>
                          } else {
                            return <span className={style.elemento__tablero}>{operacion?.name}</span>
                          }
                        })
                        :
                        <div className={style.tablero__operaciones__alerta}>
                          <Alert severity="error">¡Ten en cuenta! Para crear un indicador es obligatorio añadir operaciones.</Alert>
                        </div>
                    }
                  </div>
                </section>

                <section className={style.tablero__operadores}>
                  {
                    Object.keys(operaciones).map((op) => {
                      return <button id={op} className={style.tablero__operadores__operacion} onClick={añadeOperacion}>{op}</button>
                    })
                  }
                  <input ref={refNumero} type="number" name="operador" className={style.operacion__input} placeholder={"####"} data-tip={"Para numeros <b>decimales</b> use el <b>punto</b>"}></input>
                  <button type="button" name="operador" className={style.añade__numero} onClick={añadeOperacionNumero}><BiAddToQueue /></button>
                  <button type="button" name="operador" className={style.borrar__operacion} onClick={quitaOperacion}><RiDeleteBack2Fill /></button>
                </section>

              </div>

              <LoadingButton
                className={style.btn__añade__indicadores}
                size="small"
                onClick={enviarDatos}
                loading={loadingButton}
                loadingPosition="center"
                startIcon={<AiOutlineSave />}
                variant="contained"
                disabled={habilitaEnvio()}
              >
                Guardar
              </LoadingButton>

            </section>

            {/*LISTADO DE VARIABLES*/}
            <aside className={style.lista__variables}>
              {
                datosFiltrados ?
                  datosFiltrados.map((operable, idx) => {
                    return (
                      <div className={style.card__variable} key={uuidv4()}>
                        <h5 className={style.card__titulo}>{operable.variable_name}</h5>
                        <div key={idx} className={style.card__grid}>
                          <ul>
                            <li>Tipo:</li>
                          </ul>
                          <ul>
                            <li>{operable.type}</li>
                          </ul>
                          <button datos={creaAtributo(operable.type_id, operable.variable_name, operable.type, operable.root_id)} className={style.añade__variable} name="variable" onClick={añadeOperacion} data-tip={`Al añadir este elemento, se filtrara la lista de elementos,<br/>solo se pueden operar entre compatibles`}>Add</button>
                        </div>
                      </div>
                    )
                  })
                  :
                  <>
                    {
                      datos ?
                        datos.map((operable, idx) => {
                          return (
                            <div className={style.card__variable} key={uuidv4()}>
                              <h5 className={style.card__titulo}>{operable.variable_name}</h5>
                              <div key={idx} className={style.card__grid}>
                                <ul>
                                  <li>Tipo:</li>
                                </ul>
                                <ul>
                                  <li>{operable.type}</li>
                                </ul>
                                <button datos={creaAtributo(operable.type_id, operable.variable_name, operable.type, operable.root_id)} className={style.añade__variable} name="variable" onClick={añadeOperacion} data-tip={`Al añadir este elemento, se filtrara la lista de elementos,<br/>solo se pueden operar entre compatibles`}>Add</button>
                              </div>
                            </div>
                          )
                        })
                        :
                        null
                    }
                  </>
              }

            </aside>

            <ReactTooltip type={"dark"} effect={"solid"} place={"bottom"} html={true} backgroundColor={"#74848C"}></ReactTooltip>
          </>
          :
          <SpinnerTilata />
      }

    </div>
  )
}

export default Indicadores