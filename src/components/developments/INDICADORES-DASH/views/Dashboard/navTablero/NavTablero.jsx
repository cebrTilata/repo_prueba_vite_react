import { useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { BiSave } from "react-icons/bi";
import { BsCloudUpload } from "react-icons/bs";

import style from "./navTablero.module.css";

const NavTablero = () => {

    const navigate = useNavigate();

    const refTab = useRef();
    const [value, setValue] = useState(0);

    useEffect(() => {
        let elementoDOM = refTab.current.querySelector("[role='tablist']");
        elementoDOM.className = elementoDOM.className + " " + style.estilo__tablist;
        /* let buttonDOM = refTab.current.querySelectorAll("[role='tab']");
        buttonDOM.forEach(el => el.className = el.className + " " + style.botones); */
        
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const navegar = (e) => {
        navigate(e.target.id);
    }

    return (
        <Box ref={refTab} className={style.nav}>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" orientation="vertical" variant="scrollable" >
                <Tab id="" onClick={navegar} label="Ver tablero" />
                <Tab id="creartablero" onClick={navegar} label="Crear tablero" />
                <Tab id="editartablero" onClick={navegar} label="Editar tablero" />
            </Tabs>
        </Box>
    )
}

export default NavTablero