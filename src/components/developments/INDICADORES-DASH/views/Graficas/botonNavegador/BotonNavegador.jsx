import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { CgMenuGridR } from 'react-icons/cg';
import { MdOutlinePublishedWithChanges } from 'react-icons/md';
import { ImList2 } from "react-icons/im";
import { BiAddToQueue } from "react-icons/bi";


const BotonNavegador = () => {

    const navigate = useNavigate();
    const [menu, mostrarMenu] = useState(false);

    const expandirRetraer = (e) => {
        mostrarMenu(!menu);
    }

    return (
        <Box sx={{ position: "absolute", bottom: "0", right: "0", margin: "1rem", padding: "0.5rem" }}>

            <Collapse in={menu}>
                <Box sx={{ width: "100%", height: "65%", backgroundColor: "gray" }} onClick={expandirRetraer}>

                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginBottom: "2rem" }}>
                        <ListItem>
                            <ListItemButton onClick={() => navigate("/indicadoresdash/graficas")}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <BiAddToQueue />
                                    </Avatar>
                                </ListItemAvatar>

                                <ListItemText primary="Crear grafica" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => navigate("/indicadoresdash/graficas/usargrafica")}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <MdOutlinePublishedWithChanges />
                                    </Avatar>
                                </ListItemAvatar>

                                <ListItemText primary="Cargar grafica" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem>
                            <ListItemButton onClick={() => navigate("/indicadoresdash/graficas/misgraficas")}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImList2 />
                                    </Avatar>
                                </ListItemAvatar>

                                <ListItemText primary="Mis grafica" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Collapse>

            <Box sx={{ width: "100%", height: "30%", backgroundColor: "blue" }} onClick={expandirRetraer}>
                <Fab color="success" aria-label="add" sx={{ position: "absolute", bottom: "0", right: "0", marginTop: "10px" }} onClick={expandirRetraer}>
                    <CgMenuGridR style={{ "fontSize": "1.5rem" }} />
                </Fab>
            </Box>

        </Box>
    )
}

export default BotonNavegador