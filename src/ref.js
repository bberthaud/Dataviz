import { testco2 } from "./linechartco2.js";
import { sealevel } from "./linechartsea.js";
import { viewHome } from "./home.js";
import { banquise } from "./chartbanquise.js";
import { fin } from "./fin.js";

export function ref() {
  var divref = d3
    .select("#vis")
    .append("div")
    .attr("id", "textgraph")
    .append("div")
    .attr("class", "row");

  var textref = divref
    .append("div")
    .attr("class", "textgraph offset-1 col-10 offset-1");

  textref
    .append("text")
    .text("Ce projet a été réalisé dans le cadre du ")
    .append("a")
    .attr("href", "https://lyondataviz.github.io/teaching/lyon1-m2/2020/")
    .append("text")
    .text("Cours visualisation interactive de données ");

  textref
    .append("text")
    .text(
      "du master Data Science (Maths) de l'Université Claude-Bernard Lyon1."
    );

  textref.append("p").append("br");

  textref
    .append("text")
    .text("Pour en savoir plus sur le projet et voir le code : notre ")
    .append("a")
    .attr("href", "https://github.com/bberthaud/Dataviz_Banquise-CO2")
    .append("text")
    .text("github");

  textref.append("p").append("br");

  textref.append("text").text("Pour creuser les données des graphiques :");

  var list = textref.append("p").append("ul");

  list
    .append("li")
    .append("a")
    .attr(
      "href",
      "https://www.esrl.noaa.gov/gmd/webdata/ccgg/trends/co2/co2_trend_gl.txt"
    )
    .append("text")
    .text("émissions de CO2");

  list
    .append("li")
    .append("a")
    .attr(
      "href",
      "https://podaac.jpl.nasa.gov/dataset/TELLUS_GRAC-GRFO_MASCON_GRID_RL06_V2"
    )
    .append("text")
    .text("superficie banquise");

  list
    .append("li")
    .append("a")
    .attr(
      "href",
      "https://podaac.jpl.nasa.gov/dataset/MERGED_TP_J1_OSTM_OST_GMSL_ASCII_V3"
    )
    .append("text")
    .text("niveau de la mer");

  document.getElementById("textgraph").style.animation = "fadeIn 4s";

  var choix = d3
    .select("#vis")
    .append("div")
    .attr("id", "CHOIX")
    .attr("class", "bg-info clearfix");

  choix
    .append("button")
    .attr("type", "button")
    .attr("class", "btn btn-secondary float-left navigation finbutton")
    .text("Retour à la fin");

  document.getElementById("CHOIX").style.animation = "fadeIn 4s";

  d3.selectAll(".finbutton").on("click", function () {
    d3.selectAll("#tooltip").remove();
    d3.selectAll(".linechartco2")
      .transition()
      .duration(600)
      .attr("opacity", 0)
      .remove();
    d3.selectAll(".sealevel")
      .transition()
      .duration(600)
      .attr("opacity", 0)
      .remove();
    d3.selectAll(".banquiseextent")
      .transition()
      .duration(600)
      .attr("opacity", 0)
      .remove();
    if (document.getElementById("homediv")) {
      document.getElementById("homediv").style.animation = "fadeOut 1s";
    }
    if (document.getElementById("textgraph")) {
      document.getElementById("textgraph").style.animation = "fadeOut 1s";
    }
    if (document.getElementById("CHOIX")) {
      document.getElementById("CHOIX").style.animation = "fadeOut 1s";
    }
    setTimeout(showFin, 850);
  });
  function showFin() {
    d3.selectAll("svg").remove();
    d3.selectAll("#textgraph").remove();
    d3.selectAll("#homediv").remove();
    d3.selectAll(".navigation").remove();
    d3.selectAll("#CHOIX").remove();
    fin();
  }
}
