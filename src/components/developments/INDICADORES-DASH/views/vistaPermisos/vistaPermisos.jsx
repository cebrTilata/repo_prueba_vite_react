import { useState, useRef, useEffect } from "react";
import { grupos, listaSeleccionados } from "./fakeData";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
/* import { axiosGET } from "../../../../../request/axiosGET";
import { axiosPOST } from "../../../../../request/axiosPOST";
import config from "../../../../../controller/controllerRequesting"; */
import SpinnerTilata from "../../../../SpinnerTilata/SpinnerTilata.jsx";

import ListaGruposElegibles from "./listaGruposElegibles/ListaGruposElegibles";
import TablaSeleccionados from "./tablaSeleccionados/TablaSeleccionados";

import style from "./vistaPermisos.module.css";

const CompontenteVistaPermisos = ({ preseleccionados, estado, setEstado }) => {

    preseleccionados = listaSeleccionados; //SI ESTO ES NULL SE ROMPE, ASÍ QUE ES 

    const [datos, setDatos] = useState();
    const [seleccionados, setSeleccionados] = useState();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        (async function () {
            let respuesta = grupos;
            /* let respuesta = await axiosGET(import.meta.env.VITE_ENDPOINT_GET_VARIABLES, config()); */
            /* respuesta = respuesta.users */
            setDatos(respuesta);
        })();

        //EN CASO DE QUE SE ESTE MODIFICANDO LOS PERMISOS, SE SETEA LOS SELECCIONADOS
        setSeleccionados(preseleccionados);

    }, []);

    /* console.log("Texto fitlro", textoFiltro); */
    /* console.log("Seleccionados", seleccionados); */

    return (
        <section className={style.contenedor}>
            {
                datos ? (
                    <>
                        <ListaGruposElegibles datos={datos} preseleccionados={preseleccionados} seleccionados={seleccionados} setSeleccionados={setSeleccionados}/>
                        <TablaSeleccionados seleccionados={seleccionados} setSeleccionados={setSeleccionados} estado={estado} setEstado={setEstado}></TablaSeleccionados>
                    </>
                )
                    :
                    <SpinnerTilata></SpinnerTilata>
            }
        </section >
    );

}

const vistaPermisos = async (estado, setEstado) => {

    const mySwal = withReactContent(Swal);

    console.log("El estado desde vista permisos", estado);

    /* const respuesta = await axiosGET(import.meta.env.ALGO, config()); */

    return mySwal.fire({
        width: "auto",
        showConfirmButton: false,
        showCloseButton: true,
        overflow: "hidden",
        html: (
            <CompontenteVistaPermisos estado={estado} setEstado={setEstado}></CompontenteVistaPermisos>
        )
    })
}

export default vistaPermisos;
