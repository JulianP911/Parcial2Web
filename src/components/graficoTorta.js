import React, { useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import localeEsMessages from "../locales/es";
import localeEnMessages from "../locales/en";
import * as d3 from "d3";

function GraficoTorta (props) {
    const canvas = useRef();
    useEffect(() => {
        let language = window.navigator.language || navigator.browserLanguage;
        const selectMessages = language.startsWith('en') ? localeEnMessages : localeEsMessages;
   
        const width = 400;
        const height = 400;
        const margin = 40;

        let radius = Math.min(width, height) / 2 - margin

        let data = props.cuartosEspacio;
        let pieData = d3.pie().value((d) => d.powerUsage.value)(data);
        let arc = d3.arc().innerRadius(0).outerRadius(radius);
        let color = d3.scaleOrdinal(["#2596be", "#e28743", "#873e23", "#063970", "#eab676"]);
        
        let svg = d3.select(canvas.current)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        svg.append("g").selectAll("path")
            .data(pieData)
            .join("path")
                .attr("d", arc)
                .attr("fill", (d, i) => color(i))
                .on("mouseover", (e, d) => {
                    console.log(<FormattedMessage id="Kitchen"/>);
                    tooltip.style("visibility", 'visible')
                           .text(selectMessages[d.data.name] + ": " + d.value + " KwH");
                }).on("mousemove", (e, d) => {
                    tooltip.style("top", (e.pageY - 50) + "px")
                           .style("left", (e.pageX - 50) + "px");
                }).on("mouseout", () => {
                    tooltip.style("visibility", 'hidden');
                });

        let tooltip = d3.select("#canvas")
            .append("div")
            .style("visibility", 'hidden')
            .style("position", "absolute")
            .style("background-color", "#eab676");
    }, [props.cuartosEspacio])

    return(
        <div className="container mt-4">
            <h1><FormattedMessage id="Stats" /></h1>
            <span className="mt-4" style={{marginLeft: "6rem"}}><strong><FormattedMessage id="Power usage (kwH) - Today" /></strong></span>
            <div id="canvas">
                <svg ref={canvas}></svg>
            </div>
        </div>
    )
}

// Exportar GraficoTorta para ser utilizado en archivos externos
export default GraficoTorta;