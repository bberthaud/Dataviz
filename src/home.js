function viewHome() {
  // var img = document.createElement("img");
  // img.src = "ours3.png";

  var accueil = d3
    .select("#vis")
    .append("div")
    .attr("id", "homediv")
    .append("div")
    .attr("class", "row");

  var text = accueil.append("div").attr("class", "hometext offset-1 col-5");
  text
    .append("p")
    .append("text")
    .text(
      "La banquise fond c'est indéniable mais savez-vous depuis combien de temps ? à quelle vitesse ? est-ce problématique pour les animaux qui y vivent comme les ours ?"
    );

  text
    .append("p")
    .append("text")
    .text(
      "Nous te proposons d’étudier ce problème ensemble à travers différents graphes animés. La question qu’on se pose est la suivante : comment ont évolué la superficie des banquises et le taux d'émission de CO2 conjointement ces dernières décennies ?"
    );

  text
    .append("p")
    .append("text")
    .text(
      "Commençons par regarder l’évolution des émissions de CO2 sur les 60 dernières années."
    );

  var imag = accueil
    .append("div")
    .attr("class", "homeimage offset-1 col-4 offset-1 img-fluid")
    .append("img")
    .attr("src", "src/ours3.png")
    .attr("class", "ours3");

  var choixHome = d3
    .select("#vis")
    .append("div")
    .attr("id", "CHOIX")
    .attr("class", "bg-info clearfix d-flex justify-content-center");

  choixHome
    .append("button")
    .attr("type", "button")
    .attr("class", "btn btn-secondary navigation grapheCO2button")
    .text("Commencer");

  document.getElementById("CHOIX").style.animation = "fadeIn 4s";

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

  function showCO2() {
    d3.selectAll("svg").remove();
    d3.selectAll("#textgraph").remove();
    d3.selectAll("#homediv").remove();
    d3.selectAll(".navigation").remove();
    d3.selectAll("#CHOIX").remove();
    testco2();
  }
}
