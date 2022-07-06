import axios from "axios";

export const axiosPOST = async (endpoint, postear, config) => {

    let datos;

    try{
        const promesa = await axios.post(endpoint, postear, config);
        datos = await promesa.data;
        /* console.log("Datos desde axiosPOST", datos); */
        return datos;
    }catch(e){
        console.error(e);
    }
}