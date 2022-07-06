import { useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;


function Spinner({load, radius, height = 15, width = 5, color = null}) {
    let [localColor, setLocalColor] = useState("#af272f");
  
    return (
        <FadeLoader color={color || localColor} loading={load} height={height} width={width} radius={radius}/>
    );
  }
  
export default Spinner;