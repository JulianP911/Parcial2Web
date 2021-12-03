import React from "react";
import { FormattedMessage } from 'react-intl';

function TablaDispositivos (props) {
    return(
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col"><FormattedMessage id="Id"/></th>
                    <th scope="col"><FormattedMessage id="Device"/></th>
                    <th scope="col"><FormattedMessage id="Value"/></th>
                </tr>
            </thead>
            <tbody>
                {props.dispositivosCuarto.map((d, index) => {
                    return(
                        <tr>
                            <th scope="row">{index}</th>
                            <td>{d.id}</td>
                            <td>{d.name}</td>
                            <td>{d.desired.value !== false? d.desired.value: "off"}</td>
                        </tr>
                    )
                })}    
            </tbody>
        </table>
    )
}

export default TablaDispositivos;
