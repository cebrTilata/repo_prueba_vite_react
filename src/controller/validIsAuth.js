import axios from "axios";

const validIsAuth = () => {
    let isValid;

    isValid = axios.get(import.meta.env.VITE_ENDPOINT_AUTH_USER, { headers: {"Authorization" : `Bearer ${localStorage.getItem("tokenSession")}`} })
    .then((data) => {return data})
    .catch(error => {
        console.error(error);
    });

    if(Boolean(isValid)===false){
        localStorage.removeItem("tokenSession");
        localStorage.removeItem("userSession");
        
        window.location.href = "/";
    }
    
}

export default validIsAuth;