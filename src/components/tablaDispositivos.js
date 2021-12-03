import React, { useState } from "react";

function TablaDispositivos (props) {
    return(
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Id</th>
                    <th scope="col">Device</th>
                    <th scope="col">Value</th>
                </tr>
            </thead>
            <tbody>
                {props.dispositivosCuarto.map((d, index) => {
                    return(
                        <tr>
                            <th scope="row">{index}</th>
                            <td>{d.id}</td>
                            <td>{d.name}</td>
                            <td>{d.desired.value}</td>
                        </tr>
                    )
                })}    
            </tbody>
        </table>
    )
}

export default TablaDispositivos;
