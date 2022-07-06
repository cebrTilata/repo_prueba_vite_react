
const eventSession = (isMonitoring) => {

    // VARIABLES Y FUNCIONES PARA EL MONITOREO
    let counterTime;

    function initTimeout(){
        return window.setTimeout( () => {
            localStorage.removeItem("tokenSession");
            localStorage.removeItem("userSession");
            localStorage.setItem("inactiveSession", true);
            window.location.href = "/";
        }, import.meta.env.VITE_EVENT_EXPIRE_SESSION) //10 segundos
    }

    function stopTimeout(counterId) {
        clearTimeout(counterId);
    }

    counterTime = initTimeout();

    if(isMonitoring){

        document.addEventListener("click", () => {
            stopTimeout(counterTime); // Lo detiene
            counterTime = initTimeout(); //Acá que lo vuelva a iniciar
        });

        document.addEventListener("scroll", () => {
            stopTimeout(counterTime);
            counterTime = initTimeout();
        });

        document.addEventListener("keydown", () => {
            stopTimeout(counterTime);
            counterTime = initTimeout();
        });

    }
}


export default eventSession;