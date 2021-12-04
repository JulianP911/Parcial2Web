// Importar componentes de react, GaleriaEspacios y FormattedMessage
import React from 'react';
import GalariaEspacios from './components/galeriaEspacios';
import { FormattedMessage } from 'react-intl';

// Funcion App
function App() {
  return (
    <div className="container mt-4">
      <h1><FormattedMessage id="MyEspaces"/></h1>
      <GalariaEspacios />
    </div>
  );
}

// Exportar App para ser utilizado en archivos externos
export default App;
