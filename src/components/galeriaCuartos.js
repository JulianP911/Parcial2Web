import React, { useState, useEffect } from "react";
import TablaDispositivos from "./tablaDispositivos";

function GaleriaCuartos (props) {
    let [cuartos, setCuartos] = useState([]);
    let [cuartoSelec, setCuartoSelec] = useState();
    useEffect(() => {
        const urlAPI = "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";
        fetch(urlAPI).then((res) => res.json()).then((data) => {
            let cuartosEspacio = []
            data.forEach((d) => {
                if(String(d.homeId) === props.espacioSelecionado) {
                    cuartosEspacio.push(d)
                }
            });
            setCuartos(cuartosEspacio);
        });
    }, [props.espacioSelecionado]);
    function manejadorCuartoSelec (cuarto) {
        setCuartoSelec(cuarto);
    }
    return(
        <div className="container mt-4 mb-5">
            <h1>My rooms</h1>
            <div className="row">
                <div className={cuartoSelec != null ? "col-8": ""}>
                    <div className="row">
                        {cuartos.map((c) => {
                            return(
                                <div className="col" key={c.name}>
                                    <div className="card" onClick={() => manejadorCuartoSelec(c)}>
                                        <div className="card-body">
                                            <h5 className="card-title">{c.name}</h5>
                                        </div>
                                        <img src={String(c.name).startsWith("Kitchen")? "https://e7.pngegg.com/pngimages/169/820/png-clipart-kitchen-sink-kitchen-miscellaneous-infographic.png": "https://png.pngtree.com/png-vector/20190119/ourlarge/pngtree-cartoon-hand-painted-family-living-room-png-image_481099.jpg"} className="card-img-top" alt={c.name} style={{height: "14rem"}}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={cuartoSelec != null ? "col-4": ""}>
                    {cuartoSelec != null ? <TablaDispositivos dispositivosCuarto={cuartoSelec.devices} /> : null}
                </div>
            </div>
        </div>
    )
}

export default GaleriaCuartos;