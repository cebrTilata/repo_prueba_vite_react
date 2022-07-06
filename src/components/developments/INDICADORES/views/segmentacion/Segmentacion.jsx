import { useEffect, useState } from "react";

import { BsEyeSlash, BsEye } from "react-icons/bs";

import { BsFillInfoCircleFill } from "react-icons/bs";

import { FiSearch } from "react-icons/fi";

import style from "./segmentacion.module.css"

import catchPage from "../../../../../controller/lastPageView";

import datos from "./fakeData.js";

import { axiosGET } from "../../../../../request/axiosGET";
import { axiosPOST } from "../../../../../request/axiosPOST";

import config from "../../../../../controller/controllerRequesting";

import ReactTooltip from 'react-tooltip';

import SpinnerTilata from "../../../../SpinnerTilata/SpinnerTilata";

const Segmentacion = () => {

    catchPage();

    const [consulta, setConsulta] = useState(null);

    useEffect(async () => {
        //PASAR COMO VARIABLE DE ENTORNO
        const respuesta = await axiosGET(import.meta.env.VITE_ENDPOINT_SEGMENTATIONS, config());

        /* const respuesta = datos; */

        setConsulta(respuesta);
    }, [])

    const cambiaEstadoSegmentacion = async (e) => {

        /* await axiosPOST("https://admin.pruebas.colegiotilata.edu.co/api/indicadores/segmentations", {id:e.target.id} ,config());

        const respuesta = await axiosGET("https://admin.pruebas.colegiotilata.edu.co/api/indicadores/segmentations", config());

        setConsulta(respuesta); */

    }

    return (
        <>
            {
                consulta ?
                    <>
                        <div className={style.contenedor}>
                            <table className={style.tabla}>
                                <thead className={style.tabla__fila__variables}>
                                    <tr>
                                        <th className={style.tabla__titulo} data-tip={`<p>Hace referencia al tipo de segementacion<br></br>que se pueda aplicar a los datos</p>`}>Nombre</th>
                                        <th className={style.tabla__titulo} data-tip={`<p>Aparece "Si" en caso de que la variable de segmentacion<br></br>esta habilitada para segmentar los datos</p>`}>Visible</th>
                                        <th className={style.tabla__titulo} data-tip={`<p><h4>Presione el icono correspodiente:</h4>
                                    <ul>
                                        <li><b>Ojo verde</b>:Significa que la segmentacion esta habilitada, para deshabilitarla dark click</li>
                                        <br></br>
                                        <li><b>Ojo rojo</b>:Significa que la segmentacion esta deshabilitada, para habilitarla dark click</li>
                                    </ul>
                                    </p>`}>Acción</th>
                                    </tr>
                                </thead>
                                <tbody className={style.tabla__fila__registros}>
                                    {
                                        consulta.map((objetoSegementacion, idx) => {
                                            return (
                                                <tr className={style.tabla__fila__tupla}>
                                                    <td className={style.tabla__fila__dato}>{objetoSegementacion.name}</td>
                                                    {
                                                        objetoSegementacion.visible ?
                                                            <td className={style.tabla__fila__dato}>Si</td>
                                                            :
                                                            <td className={style.tabla__fila__dato}>No</td>
                                                    }
                                                    {
                                                        objetoSegementacion.visible ?
                                                            <td className={style.tabla__fila__dato}>
                                                                <BsEye id={objetoSegementacion.id} data-tip={"Click para <b>deshabilitar</b> segmentacion"} className={style.icono__visible__si} onClick={cambiaEstadoSegmentacion}>

                                                                </BsEye>
                                                            </td>
                                                            :
                                                            <td className={style.tabla__fila__dato}>
                                                                <BsEyeSlash id={objetoSegementacion.id} data-tip={"Click para <b>habilitar</b> segmentacion"} className={style.icono__visible__no} onClick={cambiaEstadoSegmentacion}>

                                                                </BsEyeSlash>
                                                            </td>
                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <ReactTooltip type={"light"} effect={"solid"} place={"right"} html={true}></ReactTooltip>

                    </>
                    :
                    <div className={style.contenedor}>

                        <SpinnerTilata></SpinnerTilata>
                    </div>
            }
        </>
    )
}

export default Segmentacion;