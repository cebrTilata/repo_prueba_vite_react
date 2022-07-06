
const config = () => {

    let configuracion ={
            headers:{
            Authorization: `Bearer ${window.localStorage.getItem("tokenSession")}`
        }
    }

    return configuracion;
}

export default config;