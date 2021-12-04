// Importar componentes de react, TablaDispositivos, FotoSala, FotoComedos, FotoCocina, GraficoTorta y FormattedMessage
import React, { useState, useEffect } from "react";
import TablaDispositivos from "./tablaDispositivos";
import FotoSala from "../assets/Sala.jpeg";
import FotoComedor from "../assets/Comedor.jpeg";
import FotoCocina from "../assets/Cocina.jpeg";
import GraficoTorta from "./graficoTorta";
import { FormattedMessage } from 'react-intl';

// Funcion GaleriaCuartos recibe props
function GaleriaCuartos (props) {
    // Variables de estado 
    let [cuartos, setCuartos] = useState([]);
    let [cuartoSelec, setCuartoSelec] = useState();

    // Hook de efecto para obtener la informacion del JSON que implementa PWA
    useEffect(() => {
        const urlAPI = "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";
        if(!navigator.onLine) {
            if(localStorage.getItem("cuartos") === null) {
                setCuartos("Cargando cuartos...");
            } else {
                setCuartos(JSON.parse(localStorage.getItem("cuartos")));
            }
        } else {
            fetch(urlAPI).then((res) => res.json()).then((data) => {
                let cuartosEspacio = data.filter((d) => d.homeId === props.espacioSelecionado);
                setCuartos(cuartosEspacio);
                localStorage.setItem("cuartos", JSON.stringify(cuartosEspacio));
            });
        }
        setCuartoSelec();
    }, [props.espacioSelecionado]);

    // Funcion que actualiza el estado de la variable caurtoSelec para determinar el cuarto escogido
    function manejadorCuartoSelec (cuarto) {
        setCuartoSelec(cuarto);
    }

    // Funcion que determina segun el cuarto que imagen mostrar
    function determinarImagenCuarto (cuarto) {
        if(cuarto === "Living room") {
            return FotoSala;
        } else if(cuarto === "Kitchen") {
            return FotoCocina;
        } else if(cuarto === "Dinner room") {
            return FotoComedor;
        }
    }

    return(
        <div className="container mt-4 mb-5">
            <h1><FormattedMessage id="MyRooms"/></h1>
            <div className="row mt-4">
                <div className={cuartoSelec != null ? "col-8": ""}>
                    <div className="row">
                        {cuartos.map((c) => {
                            return(
                                <div className="col" key={c.name}>
                                    <div className="card" onClick={() => manejadorCuartoSelec(c)}>
                                        <div className="card-body">
                                            <h5 className="card-title"><FormattedMessage id={c.name}/></h5>
                                        </div>
                                        <img src={determinarImagenCuarto(String(c.name))} className="card-img-top" alt={c.name} style={{height: "14rem"}}/>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={cuartoSelec != null ? "col-4": ""}>
                    {cuartoSelec != null ? <TablaDispositivos dispositivosCuarto={cuartoSelec.devices} /> : null}
                </div>
            </div>
            <GraficoTorta cuartosEspacio={cuartos} />
        </div>
    );
}

// Exportar GaleriaCuartos para ser utilizado en archivos externos
export default GaleriaCuartos;