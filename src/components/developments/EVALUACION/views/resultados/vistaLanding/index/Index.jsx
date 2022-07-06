import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Spinner from '../../../../../../Spinner/Spinner';

import config from "../../../../../../../controller/controllerRequesting";
import { axiosPOST } from "../../../../../../../request/axiosPOST";
import { axiosGET } from "../../../../../../../request/axiosGET";

import style from "./index.module.css";

const Index = ({ aplicationList, setDatasetSelected, setDataset, selectAplicationId, setSelectAplicationId }) => {

    const navigate = useNavigate();
    const [selectAplicationText, setSelectAplicationText] = useState(null);
    const [isClicked, setIsClicked] = useState(false);


    const changeOption = (e) => {
        let selectOption = document.getElementById(`${e.target.value}`);

        try {
            setSelectAplicationText(selectOption.text);
            setSelectAplicationId(e.target.value);
        } catch {
            setSelectAplicationText(null);
            setSelectAplicationId(null);
        }
    }

    const sendAplicattionId = async () => {

        setIsClicked(true);

        const resResults = await axiosPOST(import.meta.env.VITE_ENDPOINT_RESULTS, { application_id: selectAplicationId }, config());

        /* const resResults = datos; */

        //AÑADIR EL OBJETO DE INFORMACION A LOS DATOS Y A LA VISTA ESTANDAR (POR DEFAULT EL PRIMER DATO)
        setDataset(resResults);
        setDatasetSelected(resResults[0]);

        setDataset(resResults);
        setDatasetSelected(resResults[0]);

        navigate("/evaluacion/resultados/vistagraficas");

    }

    /* console.log("index recibe", aplicationList); */

    return (
        <>
            {
                aplicationList ?
                    <>

                        <div className={style.disable__nav}></div>
                        <section className={style.landing}>
                            <div className={style.landing__container}>
                                <h1 className={style.landing__titulo}>Elige una aplicación</h1>
                                <select onChange={changeOption} className={style.landing__select} defaultValue={null}>
                                    <option value={null}></option>
                                    {aplicationList.map((aplicacion, key) => {
                                        return <option id={key + 1} key={key + 1} value={aplicacion["id"]}>{aplicacion["label"]}</option>
                                    })}
                                </select>
                                {
                                    selectAplicationText ?
                                        <button className={style.landing__btn} name="selected" onClick={sendAplicattionId}>
                                            Acceder a {selectAplicationText || ""}
                                        </button>
                                        :
                                        <button className={style.landing__btn} name="selected" disabled>Acceder a {selectAplicationText || ""}</button>
                                }
                                {isClicked ?
                                    <Spinner load={true} radius={2} height={6} width={3} color="#1b365d"></Spinner>
                                    :
                                    null
                                }
                            </div>
                        </section>
                    </>

                    :
                    null
            }

        </>
    )
}

export default Index