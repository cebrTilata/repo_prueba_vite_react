
import { Routes, Route } from "react-router-dom";

import Landing from './vistaLanding/Landing';

import catchPage from "../../../../../controller/lastPageView";

const Resultados = () => {

  catchPage();

  return (
    <>

      <Routes>
        <Route exact path="/*" element={<Landing></Landing>} /> 
      </Routes>

    </>
  )

}

export default Resultados;