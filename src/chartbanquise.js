import { testco2 } from "./linechartco2.js";
import { sealevel } from "./linechartsea.js";

export function banquise() {
  d3.select("#vis").append("svg").attr("id", "svg");

  var margin = { top: 50, right: 30, bottom: 30, left: 80 },
    width =
      document.getElementById("container").offsetWidth * 0.95 -
      margin.left -
      margin.right,
    height = 500 - margin.top - margin.bottom;

  var svg3 = d3
    .select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("class", "banquiseextent")
    .attr("opacity", 1);

  var g3 = svg3.attr(
    "transform",
    "translate(" + margin.left + "," + margin.top + ")"
  );

  var x3 = d3.scaleTime().range([0, width]);
  var y3 = d3.scaleLinear().range([height, 0]);
  var parseTime3 = d3.timeParse("%Y");
  var dateFormat3 = d3.timeFormat("%d/%m/%Y");

  // Define the axes
  var x3Axis = d3.axisBottom(x3).ticks(10);
  var y3Axis = d3.axisLeft(y3).ticks(10);

  var line3 = d3
    .line()
    .x((d) => x3(d.date))
    .y((d) => y3(d.extent));

  var linehorizFr = d3
    .line()
    .x((d) => x3(d.date))
    .y((d) => y3([0.643]));

  var linehorizUS = d3
    .line()
    .x((d) => x3(d.date))
    .y((d) => y3([9.834]));

  var linehorizIndia = d3
    .line()
    .x((d) => x3(d.date))
    .y((d) => y3([3.287]));

  // Titre
  var titre3 = svg3
    .append("text")
    .attr("opacity", 0)
    .attr("x", width / 2)
    .attr("y", 0 + margin.top / 6)
    .attr("text-anchor", "middle")
    .style("fill", "#5a5a5a")
    .style("font-family", "Raleway")
    .style("font-weight", "300")
    .style("font-size", "24px")
    .text("Evolution de la superficie du cercle arctique");

  function addTooltip() {
    // Création d'un groupe qui contiendra tout le tooltip plus le cercle de suivi
    var tooltip = svg3
      .append("g")
      .attr("id", "tooltip")
      .style("display", "none");

    // Le cercle extérieur bleu clair
    tooltip
      .append("circle")
      .attr("fill", "#CCE5F6")
      .attr("r", 10)
      .style("opacity", 0.5);

    // Le cercle intérieur bleu foncé
    tooltip
      .append("circle")
      .attr("fill", "#3498db")
      .attr("stroke", "#fff")
      .attr("stroke-width", "1.5px")
      .attr("r", 4);

    // Le tooltip en lui-même avec sa pointe vers le bas
    // Il faut le dimensionner en fonction du contenu
    tooltip
      .append("polyline")
      .attr("points", "0,0 0,40 55,40 60,45 65,40 120,40 120,0 0,0")
      .style("fill", "#fafafa")
      .style("stroke", "#3498db")
      .style("opacity", "0.9")
      .style("stroke-width", "1")
      .attr("transform", "translate(-60, -55)");

    // Cet élément contiendra tout notre texte
    var text = tooltip
      .append("text")
      .style("font-size", "13px")
      .style("font-family", "Segoe UI")
      .style("color", "#333333")
      .style("fill", "#333333")
      .attr("transform", "translate(-50, -40)");

    // Element pour la date avec positionnement spécifique
    text.append("tspan").attr("dx", "-5").attr("id", "tooltip-date");

    // Positionnement spécifique pour le petit rond	bleu
    text
      .append("tspan")
      .style("fill", "#3498db")
      .attr("dx", "-60")
      .attr("dy", "15")
      .text("●");

    // Le texte pour la valeur de l'or à la date sélectionnée
    text
      .append("tspan")
      .attr("id", "tooltip-close")
      .style("font-weight", "bold");

    return tooltip;
  }

  d3.csv("arctic_superficie.csv").then(function (data3) {
    data3.forEach((d) => {
      d.date = +parseTime3(d.year);
      d.extent = +d.extent;
    });
    x3.domain(d3.extent(data3, (d) => d.date));
    y3.domain([0, 12]); // changer l'axe Y
    // y3.domain(d3.extent(data3, (d) => d.extent));

    var x3label = svg3
      .append("text")
      .style("opacity", "0")
      .attr("transform", "translate(" + width / 2 + " ," + (height + 30) + ")")
      .style("text-anchor", "middle")
      .style("font-size", "0.8em")
      .text("Date");

    // text label for the y axis
    var y3label = svg3
      .append("g")
      .append("text")
      .style("opacity", "0")
      .attr("fill", "#000")
      // .attr("transform", "rotate(-90)")
      .attr("x", 50)
      .attr("y", -17)
      .attr("dy", "0.71em")
      .style("text-anchor", "end")
      .style("font-size", "0.8em")
      .text("Superficie (en M km²)");

    // Add the X Axis
    var x3AxisL = svg3
      .append("g")
      .attr("class", "x leoLine")
      .style("opacity", "0")
      .attr("transform", "translate(0," + height + ")")
      .call(x3Axis);

    // Add the Y Axis
    var y3AxisL = svg3
      .append("g")
      .attr("class", "y leoLine")
      .style("opacity", "0")
      .call(y3Axis);

    titre3.transition().duration(2000).style("opacity", "1");
    x3label.transition().duration(2000).style("opacity", "1");
    x3AxisL.transition().duration(2000).style("opacity", "1");
    y3label.transition().duration(2000).style("opacity", "1");
    y3AxisL.transition().duration(2000).style("opacity", "1");

    var linePath3 = svg3
      .append("path")
      .datum(data3)
      .style("fill", "none")
      .style("stroke", "#9198e5") // COULEUR
      .style("stroke-width", "2.5px")
      .style("opacity", "1")
      .attr("d", line3);

    var linePath3horizFr = svg3
      .append("path")
      .datum(data3)
      .attr("class", "horiz")
      .style("fill", "none")
      .style("stroke", " #0000FF") // COULEUR
      .style("stroke-dasharray", "10,3")
      .style("stroke-width", "1.5px")
      .style("opacity", "0")
      .attr("d", linehorizFr);

    var linePath3horizUS = svg3
      .append("path")
      .datum(data3)
      .attr("class", "horiz")
      .style("fill", "none")
      .style("stroke", "#FF0000") // COULEUR
      .style("stroke-dasharray", "10,3")
      .style("stroke-width", "1.5px")
      .style("opacity", "0")
      .attr("d", linehorizUS);

    var linePath3horizIndia = svg3
      .append("path")
      .datum(data3)
      .attr("class", "horiz")
      .style("fill", "none")
      .style("stroke", "#DAA520") // COULEUR
      .style("stroke-dasharray", "10,3")
      .style("stroke-width", "1.5px")
      .style("opacity", "0")
      .attr("d", linehorizIndia);

    // var choix = d3
    //   .select("#vis")
    //   .append("div")
    //   .attr("class", "btn-group-toggle");

    // BOUTON CHECKBOX
    // var checkbox = choix
    //   .append("button")
    //   .attr("type", "button")
    //   .attr("class", "btn btn-primary")
    //   .attr("data-toggle", "button")
    //   .attr("aria-pressed", "false")
    //   .attr("autocomplete", "off")
    //   .text("Test");

    // Variable to Hold Total Length
    var totalLength3 = linePath3.node().getTotalLength();
    // Set Properties of Dash Array and Dash Offset and initiate Transition
    linePath3
      .attr("stroke-dasharray", totalLength3 + " " + totalLength3)
      .attr("stroke-dashoffset", totalLength3)
      .transition() // Call Transition Method
      .delay(1000)
      .duration(3000) // Set Duration timing (ms)
      .ease(d3.easeLinear) // Set Easing option
      .attr("stroke-dashoffset", 0); // Set final value of dash-offset for transition

    // tooltip
    var tooltip = addTooltip();
    var bisectDate = d3.bisector((d) => d.date).left; // prend la date la plus proche du curseur à gauche
    // rectangle du tooltip
    svg3
      .append("rect")
      .attr("class", "overlay")
      .attr("width", width - 1)
      .attr("height", height - 60)
      .attr("y", 60)
      .on("mouseover", function () {
        tooltip.style("display", null);
      })
      .on("mouseout", function () {
        tooltip.style("display", "none");
      })
      .on("mousemove", mousemove);

    function mousemove() {
      var x0 = x3.invert(d3.pointer(event)[0]), //d3v6
        // var x0 = x.invert(d3.mouse(this)[0]), //d3v4
        i = bisectDate(data3, x0),
        d = data3[i];
      tooltip.attr(
        "transform",
        "translate(" + x3(d.date) + "," + y3(d.extent) + ")"
      );

      d3.select("#tooltip-date").text(dateFormat3(d.date));
      d3.select("#tooltip-close").text(" " + d.extent + " M km²");
    }
  });

  //
  //
  //
  // CHECKBOX
  //
  //
  //
  //
  //
  //
  //

  // text label for the y axis
  var rectpays = svg3
    .append("rect")
    .attr("class", "rectpays")
    .style("opacity", "0")
    .style("fill", "#810808")
    .attr("width", 115)
    .attr("height", 50)
    .attr("x", width - 125) //225
    .attr("y", -10);

  var pays = svg3
    .append("g")
    .append("text")
    .style("opacity", "0")
    .attr("class", "paystoggle")
    .attr("fill", "#FFFFFF")
    .attr("x", width - 26)
    .attr("y", 0)
    .attr("dy", "0.71em")
    .style("text-anchor", "end")
    .style("font-size", "0.8em")
    .text("Comparer avec");

  var pays2 = svg3
    .append("g")
    .append("text")
    .style("opacity", "0")
    .attr("class", "paystoggle")
    .attr("fill", "#FFFFFF")
    .attr("x", width - 15)
    .attr("y", 18)
    .attr("dy", "0.71em")
    .style("text-anchor", "end")
    .style("font-size", "0.8em")
    .text("d'autres superficies");

  d3.select(".rectpays").on("click", function () {
    let currentOpacity = d3.selectAll(".horiz").style("opacity");
    d3.selectAll(".horiz")
      .transition()
      .style("opacity", currentOpacity == 1 ? 0 : 1);
    let currentOpacity1 = d3.selectAll(".legendpays").style("opacity");
    d3.selectAll(".legendpays")
      .transition()
      .style("opacity", currentOpacity1 == 1 ? 0 : 1);

    let currentColor = d3.selectAll(".rectpays").style("fill");
    console.log(currentColor);
    d3.selectAll(".rectpays").style("fill", function () {
      if (currentColor === "rgb(129, 8, 8)") {
        return "#05C50D";
      } else {
        return "#810808";
      }
    });
  });

  d3.selectAll(".paystoggle").on("click", function () {
    let currentOpacity = d3.selectAll(".horiz").style("opacity");
    d3.selectAll(".horiz")
      .transition()
      .style("opacity", currentOpacity == 1 ? 0 : 1);
    let currentOpacity1 = d3.selectAll(".legendpays").style("opacity");
    d3.selectAll(".legendpays")
      .transition()
      .style("opacity", currentOpacity1 == 1 ? 0 : 1);

    let currentColor = d3.selectAll(".rectpays").style("fill");
    console.log(currentColor);
    d3.selectAll(".rectpays").style("fill", function () {
      if (currentColor === "rgb(129, 8, 8)") {
        return "#05C50D";
      } else {
        return "#810808";
      }
    });
  });

  pays.transition().delay(500).duration(2000).style("opacity", "1");
  pays2.transition().delay(500).duration(2000).style("opacity", "1");
  rectpays.transition().delay(500).duration(2000).style("opacity", "1");

  //
  //
  //
  //

  // LEGENDE
  //
  //
  var legendeus = svg3
    .append("circle")
    .attr("class", "legendpays")
    .style("opacity", 0)
    .attr("cx", width - 150)
    .attr("cy", height - 320)
    .attr("r", 6)
    .style("fill", "#FF0000"); //#FF0000

  var legendeinde = svg3
    .append("circle")
    .attr("class", "legendpays")
    .style("opacity", 0)
    .attr("cx", width - 150)
    .attr("cy", height - 295)
    .attr("r", 6)
    .style("fill", "#DAA520"); //#DAA520
  var legendefr = svg3
    .append("circle")
    .attr("class", "legendpays")
    .style("opacity", 0)
    .attr("cx", width - 150)
    .attr("cy", height - 270)
    .attr("r", 6)
    .style("fill", "#0000FF"); //#0000FF

  var legendeustext = svg3
    .append("text")
    .attr("class", "legendpays")
    .style("opacity", 0)
    .style("fill", "#FF0000") //#FF0000
    .attr("x", width - 140)
    .attr("y", height - 315)
    .text("Etats-Unis");

  var legendeindtext = svg3
    .append("text")
    .attr("class", "legendpays")
    .style("opacity", 0)
    .style("fill", "#DAA520") //#DAA520
    .attr("x", width - 140)
    .attr("y", height - 290)
    .text("Inde");
  var legendefrtext = svg3
    .append("text")
    .attr("class", "legendpays")
    .style("opacity", 0)
    .style("fill", "#0000FF") //#0000FF
    .attr("x", width - 140)
    .attr("y", height - 265)
    .text("France");

  //
  //
  //
  // PARTIE TEXTE
  //
  //
  //
  //
  //
  //

  var divbanquise = d3
    .select("#vis")
    .append("div")
    .attr("id", "textgraph")
    .append("div")
    .attr("class", "row");

  var textbanquise = divbanquise
    .append("div")
    .attr("class", "textgraph offset-1 col-10 offset-1")
    .append("text")
    .text(
      "La banquise n’est pas seulement un écosystème : elle joue un rôle important sur la circulation océanique et sur l’équilibre climatique de l’hémisphère Nord en limitant les échanges entre atmosphère et océan et en réfléchissant une grande partie du rayonnement solaire au printemps. Terminons par l’évolution du niveau des mers et océans."
    );
  document.getElementById("textgraph").style.animation = "fadeIn 4s";

  var choix = d3
    .select("#vis")
    .append("div")
    .attr("id", "CHOIX")
    .attr("class", "bg-info clearfix");

  choix
    .append("button")
    .attr("type", "button")
    .attr("class", "btn btn-secondary float-left navigation grapheCO2button")
    .text("Revoir l'évolution des émissions de CO2");
  choix
    .append("button")
    .attr("type", "button")
    .attr("class", "btn btn-secondary float-right navigation grapheSEAbutton")
    .text("Voir l'évolution du niveau de la mer");

  document.getElementById("CHOIX").style.animation = "fadeIn 4s";

  // BOUTON POUR AFFICHER LE HOME ET CACHER LE RESTE
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

  // BOUTON POUR AFFICHER LE GRAPHE BANQUISE ET CACHER LE RESTE
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
}
