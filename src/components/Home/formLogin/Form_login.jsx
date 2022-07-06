import { Fragment, useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { axiosPOST } from "../../../request/axiosPOST";

import Swal from "sweetalert2";

import IsAuthContext from "../../../context/isAuthContext";
import DotLoader from "react-spinners/DotLoader";

import style from "./form_Login.module.css";

const Login = () => {

    const objectDate = new Date();
    const [cargando, setCargando] = useState(false);

    let localHour = objectDate.getHours();

    /* console.log(localHour); */

    const navigate = useNavigate();

    const { setIsAuth } = useContext(IsAuthContext);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    const [user, setUser] = useState({
        email: "",
        password: "",
        accesTo: "",
        remember_me: true
    });

    useEffect(() => {
        if (localStorage.getItem("inactiveSession")) {
            Swal.fire({
                title: "Lo sentimos...",
                text: "¡Sesion cerrada por inactividad!",
                icon: 'warning',
                iconColor: '#f44336',
                allowOutsideClick: false,
                confirmButtonText: "Ok",
                confirmButtonColor: '#1b365d'
            }).then((result) => {
                if (result) { localStorage.removeItem("inactiveSession") }
            })
        }
    }, []);

    const obtaingMsgWelcome = () => {
        if (localHour <= 12) {
            return <h1 className={style.formulario__h1}>Buenos días usuari@</h1>
        }
        else if (localHour >= 12 && localHour <= 16) {
            return <h1 className={style.formulario__h1}>Buenas tardes usuari@</h1>
        }
        else {
            return <h1 className={style.formulario__h1}>Buenas noches usuari@</h1>
        }
    }

    const handleInputChange = (event) => {

        setUser({
            ...user,
            [event.target.name]: event.target.value
        })

    }

    const sendUser = async (e) => {

        setCargando(true);

        e.preventDefault();

        const respuesta = await axiosPOST(import.meta.env.VITE_ENDPOINT_LOGIN, user);

        if (respuesta) {

            Toast.fire({
                icon: 'success',
                title: 'Signed in successfully'
            })

            window.localStorage.setItem("tokenSession", respuesta.access_token);
            window.localStorage.setItem("userSession", JSON.stringify(respuesta));
            setIsAuth(window.localStorage.getItem("tokenSession"));

            window.sessionStorage.setItem("lastPage", JSON.stringify(user.accesTo));

            //Tiempo para poder ver el icono...
            window.setTimeout(() => {

                navigate(user.accesTo);

            }, 1200)



        } else {
            Swal.fire({
                title: "Oops...",
                text: "Error en autentificación, por favor revisa el email y la contraseña...",
                icon: 'error',
                iconColor: '#f44336',
                confirmButtonText: "Ok",
                confirmButtonColor: '#1b365d'
            })
        }

        setCargando(false);
    }

    return (
        <Fragment>
            <form className={style.formulario} onSubmit={sendUser}>

                {obtaingMsgWelcome()}
                <input className={style.formulario__input} type="text" placeholder="EMAIL" onChange={handleInputChange} name="email"></input>
                <input className={style.formulario__input} type="password" placeholder="CONTRASEÑA" onChange={handleInputChange} name="password"></input>

                <label className={style.formulario__label}>Acceso :</label>
                <select className={style.formulario__select} onChange={handleInputChange} name="accesTo">
                    <option className={style.formulario__option} value="/">Elija una opción</option>
                    <option className={style.formulario__option} value="/evaluacion/pendientes">Talento Humano</option>
                    <option className={style.formulario__option} value="/evaluacion/pendientes">Evaluación De Desempeño</option>
                    <option className={style.formulario__option} value="/indicadores/segmentacion">Indicadores</option>
                    <option className={style.formulario__option} value="/indicadoresdash/indicadores">Indicadores Dashboard</option>
                </select>

                <div className={style.formulario__div}>
                    <button className={style.formulario__btn__enviar} type="submit">
                        {
                            cargando ?
                                <DotLoader loading={cargando} color="#ffffff" size={30}></DotLoader>
                                :
                                "Ingresar"
                        }

                    </button>
                    <button className={style.formulario__btn__limpiar} type="reset">Limpiar</button>
                </div>

            </form>
        </Fragment>
    )
};

export default Login;