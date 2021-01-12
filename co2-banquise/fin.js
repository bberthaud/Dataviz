import { testco2 } from "./linechartco2.js";
import { sealevel } from "./linechartsea.js";
import { viewHome } from "./home.js";
import { banquise } from "./chartbanquise.js";
import { ref } from "./ref.js";

export function fin() {
  var divFin = d3
    .select("#vis")
    .append("div")
    .attr("id", "textgraph")
    .append("div")
    .attr("class", "row");

  var text = divFin.append("div").attr("class", "hometext offset-1 col-5");
  text
    .append("p")
    .append("text")
    .text(
      "Les graphiques précédents permettent de mettre en évidence la corrélation entre l’augmentation des émissions de CO2 et la fonte de la banquise ce qui entraîne l’augmentation du niveau des mers et océans."
    );

  text
    .append("p")
    .append("text")
    .text(
      "Revenons à notre ami l’ours blanc. Mais où est-il passé ? “BLOBLOBLOBLO” essaie de dire l’ours blanc sous l'eau. Je crois bien qu’on l’a perdu ..."
    );

  text
    .append("p")
    .append("text")
    .text(
      "Si la fonte des glaces se poursuit au rythme actuel, la surface de son habitat estival se sera contractée de plus de 40% d'ici le milieu du 21ème siècle, faisant diminuer sa population de plus de deux tiers."
    );

  var imag = divFin
    .append("div")
    .attr("class", "homeimage offset-1 col-4 offset-1 img-fluid")
    .append("img")
    .attr("src", "ImageOurs.png")
    .attr("class", "ours3");

  document.getElementById("textgraph").style.animation = "fadeIn 4s";

  var choix = d3
    .select("#vis")
    .append("div")
    .attr("id", "CHOIX")
    .attr("class", "bg-info clearfix");

  choix
    .append("button")
    .attr("type", "button")
    .attr("class", "btn btn-secondary float-left navigation grapheSEAbutton")
    .text("Revoir l'évolution du niveau de la mer");
  choix
    .append("button")
    .attr("type", "button")
    .attr("class", "btn btn-secondary float-right navigation refbutton")
    .text("Références");

  document.getElementById("CHOIX").style.animation = "fadeIn 4s";

  d3.selectAll(".grapheSEAbutton").on("click", function () {
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
    setTimeout(showSEA, 850);
  });
  function showSEA() {
    d3.selectAll("svg").remove();
    d3.selectAll("#textgraph").remove();
    d3.selectAll("#homediv").remove();
    d3.selectAll(".navigation").remove();
    d3.selectAll("#CHOIX").remove();
    sealevel();
  }

  d3.selectAll(".refbutton").on("click", function () {
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
    setTimeout(showRef, 850);
  });
  function showRef() {
    d3.selectAll("svg").remove();
    d3.selectAll("#textgraph").remove();
    d3.selectAll("#homediv").remove();
    d3.selectAll(".navigation").remove();
    d3.selectAll("#CHOIX").remove();
    ref();
  }
}
