import { BiAddToQueue } from "react-icons/bi";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { useState, useEffect, useRef } from "react";

import style from "./modalTemporalidad.module.css";

import CampoFormulario from "../campoFormulario/CampoFormulario";

import datosTemporalidad from "./fakeData";

import { axiosGET } from "../../../../../../request/axiosGET";
import { axiosPOST } from "../../../../../../request/axiosPOST";
import config from "../../../../../../controller/controllerRequesting";

import { v4 as uuidv4 } from "uuid";

const ModalTemporalidad = ({ salirModal }) => {

    const refDivContainer = useRef();

    //PARA SEGMENTAR LOS DATOS Y GENERAR SUS DEPENDENCIAS
    const [datos, setDatos] = useState();
    const [objetoEnvio, setObjetoEnvio] = useState({
        name: "",
        parent_id: "",
        units: ""
    });
    const [objeto, setObjeto] = useState({
        name: "",
        parent_id: "",
        value: "",
        childrens: []
    });
    const [anadidos, setAnadidos] = useState([]);


    useEffect(async () => {
        const respuesta = await axiosGET(import.meta.env.VITE_ENDPOINT_TEMPORALITY_GET_CREATE, config());
        /* const respuesta = datosTemporalidad; */
        setDatos(respuesta);
    }, [])

    const handleChange = (e) => {
        setObjeto({
            ...objeto,
            [e.target.name]: e.target.value
        });

        if (e.target.name === "parent_id") {
            let padre = datos.filter(
                (objeto) => parseInt(objeto.id) === parseInt(e.target.value)
            )[0];

            setObjeto({
                ...objeto,
                childrens: padre.units 
            });
        }
    };

    const capturar = (e) => {
        let objetoAnadido = objeto;
        objetoAnadido.id = 999 - anadidos.length;
        setAnadidos([...anadidos, objeto]);
    };

    const eliminar = (e) => {
        let recibeAnadidos = anadidos;
        recibeAnadidos = recibeAnadidos.filter(el => parseInt(el.id) !== parseInt(e.target.id))
        setAnadidos([
            ...recibeAnadidos
        ])
    }

    const funcionGuardar = async (e) => {
        e.preventDefault();

        let nodos = refDivContainer.current.childNodes;
        let arrayObjetos = [];

        nodos.forEach((div) => {
            let hijos = div.childNodes;
            let objetoTemporal = {
                name: "",
                parent_unit_id: "",
                days: ""
            }

            hijos.forEach((elemento) => {
                objetoTemporal[elemento.getAttribute("name")] = elemento.value
                /* console.log("Index", objetoTemporal); */
            })

            arrayObjetos.push(objetoTemporal);

        })

        setObjetoEnvio({
            ...objetoEnvio,
            units: arrayObjetos
        })

        let enviado = objetoEnvio;

        console.log("Se esta enviando", enviado);

        try {
            await axiosPOST(import.meta.env.VITE_ENDPOINT_TEMPORALITY_POST_CREATE, objetoEnvio, config());
            /* console.log("Enviado") */
        } catch (e) {
            console.error(e)
        }

    }

    /* console.log(objeto);
    console.log("Los datos", datos); */

    return (
        <>
            <div className={style.contenedor__cortina}>
            </div>
            <form className={style.formulario}>
                <p className={style.salir} onClick={() => salirModal(0)}>Salir</p>
                <label className={style.formulario__label}>Nombre</label>
                <input name="name" type="text" placeholder="Ejemplo: Año Academico" onChange={handleChange} className={style.formulario__input}></input>
                <label className={style.formulario__label}>Padre</label>
                <select name="parent_id" className={style.formulario__input} onChange={handleChange}>
                    <option value={null}></option>
                    {
                        datos ?
                            <>
                                {
                                    datos.map((objeto) => {
                                        /* console.log("Cada padre", objeto); */
                                        return <option value={objeto.id}>{objeto.name}</option>
                                    })
                                }
                            </>
                            :
                            null
                    }
                </select>
                <label className={style.formulario__label}>Unidades de temporalidad</label>
                <div className={style.formulario__div}>
                    <input name="value" type="text" placeholder="Ejemplo: Años" className={style.formulario__input__div} defaultValue={null} onChange={handleChange}></input>
                    <BiAddToQueue className={style.icono__anadir} onClick={capturar} />
                </div>
                {
                    anadidos ?
                        anadidos.map((anadido) => {
                            return (
                                <div key={anadido.id} className={style.contendor_dinamico}>
                                    <input defaultValue={anadido.value} className={style.formulario__input}></input>
                                    <select className={style.formulario__input}>
                                        <option></option>
                                        {anadido.childrens.map((hijo) => (
                                            <option key={hijo.id} value={hijo.id}>
                                                {hijo.name}
                                            </option>
                                        ))}
                                    </select>
                                    <input placeholder="Ingrese un valor" defaultValue={anadido.name} className={style.formulario__input}></input>
                                    <IoIosRemoveCircleOutline className={style.icono__quitar} id={anadido.id} type="button" onClick={eliminar} />
                                </div>
                            );
                        })
                        :
                        console.log("NO HAY NADA")
                }
                <button className={style.boton__guardar} onClick={funcionGuardar}>Guardar</button>
            </form>
        </>
    );
}

export default ModalTemporalidad;