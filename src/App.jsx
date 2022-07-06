/*ESPACIO PARA IMPORTAR LIBRERIAS EXTRENAS, ES DECIR NO PROPIAS*/
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../src/styles/app.css";

//ESPACIO PARA IMPORTAR LAS VISTAS
import Login from "./components/Home/login/Login";
import TalentoHumanoRutas from './components/developments/TALENTO-HUMANO/views/routes/TalentoHumanoRutas';
import EvaluacionDesempenoRutas from "./components/developments/EVALUACION/views/routes/EvaluacionDesempenoRutas";
import Indicadores from "./components/developments/INDICADORES/views/routes/Indicadores";
import IndicadoresDash from "./components/developments/INDICADORES-DASH/views/routes/IndicadoresDash";
import PageNotFound from './components/PageNotFound/PageNotFound';

//CONTEXT NECESARIOS
import IsAuthContext from './context/isAuthContext';
import IsNavbarExpand from './context/isNavbarExpand';
import InfoEvaluatedContext from './context/infoEvaluatedContex';

//MIDDLEWARES
import cronometroSesion from "./controller/expireSessionTime";
import eventSession from "./controller/expireSessionEvent";

function App() {


  /*CUANDO DE LOGOUT, O ALGUN EVENTO TERMINE EL TOKEN
  EL "tokenSession" QUEDARA VACIO */

  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(() => {
    return window.localStorage.getItem("tokenSession");
  });

  const [isNavbarExpand, setIsNavbarExpand] = useState(true);

  const [userEvaluated, setUserEvaluated] = useState(null);

  const [circlePosition, setCirclePosition] = useState("left");

  const [alertaLoguin, mostrarAlertaLoguin] = useState(true);

  //AL YA ESTAR ASOCIADO A UN STATE, ¿SERA NECESARIO TENER ESE EFFECT?
  useEffect(() => {

  }, [isAuth])

  const controladorLogueo = () => {
    navigate("/");
  }

  return (

    <IsAuthContext.Provider value={{ isAuth, setIsAuth }}>

      <IsNavbarExpand.Provider value={{ isNavbarExpand, setIsNavbarExpand }}>

        <InfoEvaluatedContext.Provider value={{ userEvaluated, setUserEvaluated }}>

          <main className="maincontainer">
            <Routes>
              <Route index element={<Login />} />
              {
                isAuth ?
                  <>
                    {cronometroSesion(true)}
                    {eventSession(true)}
                    <Route path="talentohumano/*" element={<TalentoHumanoRutas />} />
                    {/* TOCA CREAR CONTEXO PARA LAS EVALUACIONES */}
                    <Route path="evaluacion/*" element={<EvaluacionDesempenoRutas />} />
                    <Route path="indicadores/*" element={<Indicadores />}></Route>
                    <Route path="indicadoresdash/*" element={<IndicadoresDash />}></Route>
                  </>
                  :
                  navigate("/")
              }
              <Route path="*" element={<PageNotFound></PageNotFound>} />
            </Routes>
          </main>

        </InfoEvaluatedContext.Provider>

      </IsNavbarExpand.Provider>

    </IsAuthContext.Provider>
  )
}

export default App;
