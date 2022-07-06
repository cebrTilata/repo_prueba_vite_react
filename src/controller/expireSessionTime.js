
const cronometroSesion = (booleano) => {

    if(booleano){
        setTimeout(() => {
            localStorage.removeItem("tokenSession");
            localStorage.removeItem("userSession");
            alert("Sesión expirada, ingrese de nuevo...");
        }, import.meta.env.VITE_TIME_EXPIRE_SESSION)
    }
}
export default cronometroSesion;