import axios from "axios";

export const axiosGET = async (endpoint, config) => {
    let promesa;
    let datos; 
    
    if(config){
        promesa = await axios.get(endpoint, config);
        datos = promesa.data;
    }else{
        promesa = await axios.get(endpoint);
        datos = promesa.data;
    }

    return datos;
}