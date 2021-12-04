// Importar componentes de react, FormattedMessage, locales (es, en) y d3
import React, { useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import localeEsMessages from "../locales/es";
import localeEnMessages from "../locales/en";
import * as d3 from "d3";

// Funcion GraficoTorta
function GraficoTorta (props) {
    // Obtener el elemento canvas haciendo uso del hook useRef
    const canvas = useRef();

    // Hook de efecto que permite la ejecucion y construccion del grafica de torta
    useEffect(() => {
        // Obtener el lenguaje definido en el navegador o el buscador
        let language = window.navigator.language || navigator.browserLanguage;

        // Determinar la url de JSON segun el idioma del navegador
        const selectMessages = language.startsWith('en') ? localeEnMessages : localeEsMessages;
   
        // Caracteristicas del canvas (width, height, margin, radius)
        const width = 400;
        const height = 400;
        const margin = 40;
        const radius = Math.min(width, height) / 2 - margin;

        // Variable data que almacena los datos del cuartos de un espacaio
        let data = props.cuartosEspacio;

        // Variable en que se establece los datos para el grafico de torta con os volores energeticos del cuarto
        let datosTorta = d3.pie().value((d) => d.powerUsage.value)(data);
        let arco = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        // Establecer un rango de colores para las porciones del grafico de torta
        let color = d3.scaleOrdinal(["#2596be", "#e28743", "#873e23", "#063970", "#eab676"]);
        
        // Creacion del elemento svg para la grafica de torta con sus atributos
        let svg = d3.select(canvas.current)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // Configuración del grafico de torta con sus atributos y animaciones para mostrar el tooltip
        svg.append("g").selectAll("path")
            .data(datosTorta)
            .join("path")
            .attr("d", arco)
            .attr("fill", (data, index) => color(index))
            .attr("stroke", "white")
            .on("mouseover", (event, data) => {
                tooltip.style("visibility", 'visible')
                       .text(selectMessages[data.data.name] + ": " + data.value + " KwH");
            })
            .on("mousemove", (event, data) => {
                tooltip.style("top", (event.pageY - 50) + "px")
                       .style("left", (event.pageX - 50) + "px");
            })
            .on("mouseout", () => {
                tooltip.style("visibility", "hidden");
            });

        // Creacion del tooltip para indicar información de la porcion del grafico de torta
        let tooltip = d3.select("#canvas")
            .append("div")
            .style("visibility", 'hidden')
            .style("position", "absolute")
            .style("background-color", "#eab676");
    }, [props.cuartosEspacio])

    return(
        <div className="container mt-4">
            <h1 className="mb-3"><FormattedMessage id="Stats" /></h1>
            <span className="mt-5" style={{marginLeft: "6rem"}}><strong><FormattedMessage id="Power usage (kwH) - Today" /></strong></span>
            <div id="canvas">
                <svg ref={canvas}></svg>
            </div>
        </div>
    )
}

// Exportar GraficoTorta para ser utilizado en archivos externos
export default GraficoTorta;