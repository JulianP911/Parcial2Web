// Importar componentes de react y FormattedMessage
import React from "react";
import { FormattedMessage } from 'react-intl';

// Funcion TablaDispositivos recibe props
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
                        <tr key={index}>
                            <th scope="row">{index}</th>
                            <td>{d.id !== undefined? d.id: "N/A"}</td>
                            <td>{<FormattedMessage id={d.name} />}</td>
                            <td>{d.desired.value !== false && isNaN(d.desired.value.toString()) ? <FormattedMessage id={d.desired.value} />: isNaN(d.desired.value.toString())? <FormattedMessage id="off" />: d.desired.value}</td>
                        </tr>
                    );
                })}    
            </tbody>
        </table>
    );
}

// Exportar TablaDispositivos para ser utilizado en archivos externos
export default TablaDispositivos;
