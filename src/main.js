// ##################################################################################################################################################################
// on cree le seul et l'unique svg
viewHome();

// BOUTON POUR AFFICHER LE HOME ET CACHER LE RESTE
d3.selectAll(".homebutton").on("click", function () {
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

  setTimeout(showHome, 850);
});
function showHome() {
  d3.selectAll("svg").remove();
  d3.selectAll("#textgraph").remove();
  d3.selectAll("#homediv").remove();
  d3.selectAll(".navigation").remove();
  d3.selectAll("#CHOIX").remove();
  viewHome();
}
function showCO2() {
  d3.selectAll("svg").remove();
  d3.selectAll("#textgraph").remove();
  d3.selectAll("#homediv").remove();
  d3.selectAll(".navigation").remove();
  d3.selectAll("#CHOIX").remove();
  testco2();
}
function showSEA() {
  d3.selectAll("svg").remove();
  d3.selectAll("#textgraph").remove();
  d3.selectAll("#homediv").remove();
  d3.selectAll(".navigation").remove();
  d3.selectAll("#CHOIX").remove();
  sealevel();
}
function showBanquise() {
  d3.selectAll("svg").remove();
  d3.selectAll("#textgraph").remove();
  d3.selectAll("#homediv").remove();
  d3.selectAll(".navigation").remove();
  d3.selectAll("#CHOIX").remove();
  banquise();
}
function showFin() {
  d3.selectAll("svg").remove();
  d3.selectAll("#textgraph").remove();
  d3.selectAll("#homediv").remove();
  d3.selectAll(".navigation").remove();
  d3.selectAll("#CHOIX").remove();
  fin();
}
function showRef() {
  d3.selectAll("svg").remove();
  d3.selectAll("#textgraph").remove();
  d3.selectAll("#homediv").remove();
  d3.selectAll(".navigation").remove();
  d3.selectAll("#CHOIX").remove();
  ref();
}

// BOUTON POUR AFFICHER LE GRAPHE CO2 ET CACHER LES AUTRES
d3.selectAll(".grapheCO2button").on("click", function () {
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
  // d3.selectAll("#homediv").attr("animation", "fadeOut 2s");
  if (document.getElementById("homediv")) {
    document.getElementById("homediv").style.animation = "fadeOut 1s";
  }
  if (document.getElementById("textgraph")) {
    document.getElementById("textgraph").style.animation = "fadeOut 1s";
  }
  if (document.getElementById("CHOIX")) {
    document.getElementById("CHOIX").style.animation = "fadeOut 1s";
  }
  setTimeout(showCO2, 850);
});

// BOUTON POUR AFFICHER LE GRAPHE SEA LEVEL ET CACHER LES AUTRES
d3.selectAll(".grapheSEAbutton").on("click", function () {
  d3.selectAll("#tooltip").remove();
  d3.selectAll(".sealevel")
    .transition()
    .duration(600)
    .attr("opacity", 0)
    .remove();
  d3.selectAll(".linechartco2")
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

// BOUTON POUR AFFICHER LE GRAPHE BANQUISE ET CACHER LE RESTE
d3.selectAll(".grapheBanquisebutton").on("click", function () {
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
  setTimeout(showBanquise, 850);
});

// BOUTON POUR AFFICHER LA FIN ET CACHER LE RESTE
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

// BOUTON POUR AFFICHER LES REFERENCES ET CACHER LE RESTE
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
  // d3.selectAll(".home").transition().duration(600).attr("opacity", 0).remove();
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
