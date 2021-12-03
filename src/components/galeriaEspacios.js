import React, { useState, useEffect } from "react";
import GaleriaCuartos from "./galeriaCuartos";

function GalariaEspacios () {
    let [espacios, setEspacios] = useState([]);
    let [espacioSelec, setEspacioSelec] = useState();
    useEffect(() => {
        const urlAPI = "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
        fetch(urlAPI).then((res) => res.json()).then((data) => {
            setEspacios(data);
        });
    }, [])
    function manejadorEspacioSelec (espacio) {
        setEspacioSelec(espacio);
    }
    return(
        <div className="container mt-4">
            <div className="row">
                {espacios.map((e) => {
                    return(
                        <div className="col-3">
                            <div className="card" onClick={() => manejadorEspacioSelec(e)}>
                                <img src={String(e.name).startsWith("Casa")? "https://images.emojiterra.com/google/android-10/512px/1f3e0.png": "https://static.vecteezy.com/system/resources/previews/002/714/106/non_2x/retro-house-flat-design-hometown-on-street-with-isolated-white-background-shop-house-modern-design-apartment-cartoon-vector.jpg"} className="card-img-top" alt={e.name} style={{height: "17rem"}}/>
                                <div className="card-body">
                                    <h5 className="card-title">{e.name}</h5>
                                    <p className="card-text">{e.address}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            {espacioSelec != null ? <GaleriaCuartos espacioSelecionado={espacioSelec.id} /> : null}
        </div>
    )
}

export default GalariaEspacios;