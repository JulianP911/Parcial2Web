// Importar componentes de react, GaleriaEspacios, FotoCasa, FotoApartamento y FormattedMessage
import React, { useState, useEffect } from "react";
import GaleriaCuartos from "./galeriaCuartos";
import FotoCasa from "../assets/Casa.png";
import FotoApartamento from "../assets/Apartamento.png";
import { FormattedMessage } from 'react-intl';

// Funcion GalariaEspacios
function GalariaEspacios () {
    // Variables de estado 
    let [espacios, setEspacios] = useState([]);
    let [espacioSelec, setEspacioSelec] = useState();

    // Hook de efecto para obtener la informacion del JSON que implementa PWA
    useEffect(() => {
        const urlAPI = "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
        if(!navigator.onLine) {
            if(localStorage.getItem("espacios") === null) {
                setEspacios("Cargando espacios...");
            } else {
                setEspacios(JSON.parse(localStorage.getItem("espacios")))
            }
        } else {
            fetch(urlAPI).then((res) => res.json()).then((data) => {
                setEspacios(data);
                localStorage.setItem("espacios", JSON.stringify(data));
            });
        }
    }, [])

    // Funcion que actualiza el estado de la variable espacioSelec para determinar el espacio escogido
    function manejadorEspacioSelec (espacio) {
        setEspacioSelec(espacio);
    }

    return(
        <div className="container mt-4">
            <div className="row">
                {espacios.map((e) => {
                    return(
                        <div className="col-3" key={e.id}>
                            <div className="card" onClick={() => manejadorEspacioSelec(e)}>
                                <img src={String(e.name).startsWith("Casa")? FotoCasa : FotoApartamento} className="card-img-top" alt={e.name} style={{height: "15rem"}}/>
                                <div className="card-body">
                                    <h5 className="card-title"><FormattedMessage id={e.name}/></h5>
                                    <p className="card-text">{e.address}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {espacioSelec != null ? <GaleriaCuartos espacioSelecionado={espacioSelec.id} />: null}
        </div>
    );
}

// Exportar GalariaEspacios para ser utilizado en archivos externos
export default GalariaEspacios;