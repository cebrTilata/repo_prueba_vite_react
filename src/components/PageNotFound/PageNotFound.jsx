
import imagen from "../../resource/Símbolo Tilatá.png"
import "./pageNotFound.css"

const PageNotFound = () => {
    const funcRedirection = () => {
        window.location.href = "/";
    }

    return (
        <>

            <div className="pgNotFound">
                <div className="pgNotFound__sideLeft">
                    <img className="pgNotFound__img" src={imagen}></img>
                </div>

                <div className="pgNotFound__sideRight">
                    <h1 className="pgNotFound__404">¡ 404 !</h1>
                    <h1 className="pgNotFound__desc">PAGINA NO ENCONTRADA: Asegurese de haber ingresado a una ruta previamente autorizada o que si exista</h1>
                    <button className="pgNotFound__btn" onClick={funcRedirection}>Ir a Login</button>
                </div>
            </div>
        </>
    )
}

export default PageNotFound;