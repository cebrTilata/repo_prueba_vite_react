import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SpinnerTilata from '../../../../../SpinnerTilata/SpinnerTilata';
import { aplications } from "./aplications"; //Aplicaciones de prueba
import { datos } from "../fakeData"; //Datos de prueba

import config from "../../../../../../controller/controllerRequesting";
import { axiosPOST } from "../../../../../../request/axiosPOST";
import { axiosGET } from "../../../../../../request/axiosGET";

import Graficos from "../vistaGraficos/Graficos";
import Tablas from '../vistaTablas/Tablas';
import Navdashboard from '../navDashboard/navDashboard';
import PlanMejora from "../vistaPlanMejora/FormPlanMejora";
import Index from "./index/Index";
import Spinner from '../../../../../Spinner/Spinner';

import "./landing.css";

const Landing = () => {

    const navigate = useNavigate();

    const [selectAplicationId, setSelectAplicationId] = useState(null);
    const [aplicationList, setAplicationList] = useState(null);
    const [datasetSelected, setDatasetSelected] = useState(null);
    const [dataset, setDataset] = useState(null);
    const [isClicked, setIsClicked] = useState(false);



    //Funcion que imprime el año en el boton
    /* const changeOption = (e) => {
        let selectOption = document.getElementById(`${e.target.value}`);

        try {
            setSelectAplicationText(selectOption.text);
            setSelectAplicationId(e.target.value);
        } catch {
            setSelectAplicationText(null);
            setSelectAplicationId(null);
        }
    } */

    useEffect(async () => {

        const resListAplications = await axiosGET(import.meta.env.VITE_ENDPOINT_APLICATIONS_LIST, config());
        /* const resListAplications = aplications; */
        setAplicationList(resListAplications);

    }, [])

    const functionSelectData = (indexedData) => {

        setDatasetSelected(indexedData);

    }

    if (aplicationList) {
        return (
            <>

                {dataset ?
                    <>
                        <Navdashboard datos={dataset} functionSelectData={functionSelectData}></Navdashboard>

                    </>
                    :
                    null
                }

                <Routes>
                    <Route index element={<Index aplicationList={aplicationList} setDatasetSelected={setDatasetSelected} setDataset={setDataset} selectAplicationId={selectAplicationId} setSelectAplicationId={setSelectAplicationId} />} />
                    <Route exact path='/vistagraficas' element={<Graficos datos={datasetSelected}></Graficos>} />
                    <Route exact path='/vistatablas' element={<Tablas datos={datasetSelected}></Tablas>} />
                    {/* {console.log("La aplicación seleccionada es", selectAplicationId)} */}
                    <Route exact path='/plandemejora' element={<PlanMejora aplicacion={selectAplicationId} datos={datasetSelected}></PlanMejora>} />
                </Routes>
            </>
        )
    }
    else {
        return (
            <>
                <div className="spinner__landing">
                    <SpinnerTilata></SpinnerTilata>
                </div>
            </>
        )
    }



}

export default Landing