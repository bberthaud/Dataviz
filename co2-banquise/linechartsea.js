import { banquise } from "./chartbanquise.js";
import { fin } from "./fin.js";

export function sealevel() {
  d3.select("#vis").append("svg").attr("id", "svg");

  var margin = { top: 50, right: 30, bottom: 30, left: 80 },
    width =
      document.getElementById("container").offsetWidth * 0.95 -
      margin.left -
      margin.right,
    height = 500 - margin.top - margin.bottom;

  var svg2 = d3
    .select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("class", "sealevel")
    .attr("opacity", 1);

  var g2 = svg2.attr(
    "transform",
    "translate(" + margin.left + "," + margin.top + ")"
  );

  var x2 = d3.scaleTime().range([0, width]);
  var y2 = d3.scaleLinear().range([height, 0]);
  var parseTime2 = d3.timeParse("%Y-%m-%d");
  var dateFormat2 = d3.timeFormat("%d/%m/%Y");

  // Define the axes
  var x2Axis = d3.axisBottom(x2).ticks(10);
  var y2Axis = d3.axisLeft(y2).ticks(10);

  var line2 = d3
    .line()
    .x((d) => x2(d.date))
    .y((d) => y2(d.sea));

  // pour le dégradé sous la courbe
  var area2 = d3
    .area()
    .x((d) => x2(d.date))
    .y0(height)
    .y1((d) => y2(d.sea));

  // Titre
  var titre2 = svg2
    .append("text")
    .attr("opacity", 0)
    .attr("x", width / 2)
    .attr("y", 0 + margin.top / 6)
    .attr("text-anchor", "middle")
    .style("fill", "#5a5a5a")
    .style("font-family", "Raleway")
    .style("font-weight", "300")
    .style("font-size", "24px")
    .text("Evolution du niveau de la mer");

  function addTooltip() {
    // Création d'un groupe qui contiendra tout le tooltip plus le cercle de suivi
    var tooltip = svg2
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

  d3.csv("sea_level_predict_offset.csv").then(function (data2) {
    function leapYear(year) {
      return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    }

    function convertDecimalDate(decimalDate) {
      var year = parseInt(decimalDate);
      var reminder = decimalDate - year;
      var daysPerYear = leapYear(year) ? 366 : 365;
      var miliseconds = reminder * daysPerYear * 24 * 60 * 60 * 1000;
      var yearDate = new Date(year, 0, 1);
      return new Date(yearDate.getTime() + miliseconds);
    }

    data2.forEach((d) => {
      // d.date = convertDecimalDate(d.year);
      d.date = parseTime2(d.year);
      d.sea = +d.GMSL;
    });

    x2.domain(d3.extent(data2, (d) => d.date));
    y2.domain(d3.extent(data2, (d) => d.sea));

    var x2label = svg2
      .append("text")
      .style("opacity", "0")
      .attr("transform", "translate(" + width / 2 + " ," + (height + 30) + ")")
      .style("text-anchor", "middle")
      .style("font-size", "0.8em")
      .text("Date");

    // text label for the y axis
    var y2label = svg2
      .append("g")
      .append("text")
      .style("opacity", "0")
      .attr("fill", "#000")
      // .attr("transform", "rotate(-90)")
      .attr("x", 40)
      .attr("y", -17)
      .attr("dy", "0.71em")
      .style("text-anchor", "end")
      .style("font-size", "0.8em")
      .text("Niveau de la mer");

    // Add the X Axis
    var x2AxisL = svg2
      .append("g")
      .attr("class", "x leoLine")
      .style("opacity", "0")
      .attr("transform", "translate(0," + height + ")")
      .call(x2Axis);

    // Add the Y Axis
    var y2AxisL = svg2
      .append("g")
      .attr("class", "y leoLine")
      .style("opacity", "0")
      .call(y2Axis);

    titre2.transition().duration(2000).style("opacity", "1");
    x2label.transition().duration(2000).style("opacity", "1");
    x2AxisL.transition().duration(2000).style("opacity", "1");
    y2label.transition().duration(2000).style("opacity", "1");
    y2AxisL.transition().duration(2000).style("opacity", "1");

    var linePath2 = svg2
      .append("path")
      .datum(data2)
      .style("fill", "none")
      .style("stroke", "#3498db") // COULEUR
      .style("stroke-width", "1.5px")
      .style("opacity", "1")
      // .attr("d", line2)
      .attr(
        "d",
        line2(
          data2.filter(function (d) {
            return d.id < 1019;
          })
        )
      );
    var linePathPredict2 = svg2
      .append("path")
      .datum(data2)
      .style("fill", "none")
      .style("stroke", "#FF0000") // COULEUR
      .style("stroke-width", "1.5px")
      .style("opacity", "1")
      // .attr("d", line2)
      .attr(
        "d",
        line2(
          data2.filter(function (d) {
            return d.id > 1017;
          })
        )
      );
    // Predictions à partir du 2020-08-15
    // Le reste du code ira ici
    svg2
      .append("linearGradient")
      .attr("id", "areachart-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", y2(d3.min(data2, (d) => d.sea)))
      .attr("y2", y2(d3.max(data2, (d) => d.sea)))
      .selectAll("stop")
      .data([
        { offset: "0%", color: "#c6dbef" },
        { offset: "100%", color: "#2171b5" }
      ]) // couleur dégradé
      //  https://observablehq.com/@d3/color-schemes?collection=@d3/d3-scale-chromatic
      .enter()
      .append("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.color);

    var areaPath2 = svg2
      .append("path")
      .datum(data2)
      .style("fill", "url(#areachart-gradient)")
      .style("opacity", "0")
      .attr(
        "d",
        area2(
          data2.filter(function (d) {
            return d.id < 1019;
          })
        )
      );
    //  decommenter si on veut afficher le dégradé sous la courbe

    areaPath2
      .transition() // Call Transition Method
      .delay(3200)
      .duration(4000) // Set Duration timing (ms)
      .style("opacity", 1); // Set final value of dash-offset for transition

    // Variable to Hold Total Length
    var totalLength2 = linePath2.node().getTotalLength();
    // Set Properties of Dash Array and Dash Offset and initiate Transition
    linePath2
      .attr("stroke-dasharray", totalLength2 + " " + totalLength2)
      .attr("stroke-dashoffset", totalLength2)
      .transition() // Call Transition Method
      .delay(1000)
      .duration(3000) // Set Duration timing (ms)
      .ease(d3.easeLinear) // Set Easing option
      .attr("stroke-dashoffset", 0); // Set final value of dash-offset for transition

    var totalLengthPredict2 = linePathPredict2.node().getTotalLength();
    linePathPredict2
      .attr("stroke-dasharray", totalLengthPredict2 + " " + totalLengthPredict2)
      .attr("stroke-dashoffset", totalLengthPredict2)
      .transition() // Call Transition Method
      .delay(4000)
      .duration(3000) // Set Duration timing (ms)
      .ease(d3.easeLinear) // Set Easing option
      .attr("stroke-dashoffset", 0); // Set final value of dash-offset for transition

    // tooltip
    var tooltip = addTooltip();
    var bisectDate = d3.bisector((d) => d.date).left; // prend la date la plus proche du curseur à gauche
    // rectangle du tooltip
    svg2
      .append("rect")
      .attr("class", "overlay")
      .attr("width", width - 1)
      .attr("height", height)
      .on("mouseover", function () {
        tooltip.style("display", null);
      })
      .on("mouseout", function () {
        tooltip.style("display", "none");
      })
      .on("mousemove", mousemove);

    var legendesea1 = svg2
      .append("circle")
      .style("opacity", 0)
      .attr("cx", 80)
      .attr("cy", height - 300)
      .attr("r", 6)
      .style("fill", "#3498db");

    var legendesea2 = svg2
      .append("circle")
      .style("opacity", 0)
      .attr("cx", 80)
      .attr("cy", height - 275)
      .attr("r", 6)
      .style("fill", "#FF0000");

    var legendesea1text = svg2
      .append("text")
      .style("opacity", 0)
      .style("fill", "#3498db")
      .attr("x", 95)
      .attr("y", height - 295)
      .text("Données mesurées");

    var legendesea2text = svg2
      .append("text")
      .style("opacity", 0)
      .style("fill", "#FF0000")
      .attr("x", 95)
      .attr("y", height - 270)
      .text("Prédictions");
    legendesea1text.transition().delay(3000).duration(2000).style("opacity", 1);
    legendesea2text.transition().delay(3000).duration(2000).style("opacity", 1);
    legendesea1.transition().delay(3000).duration(2000).style("opacity", 1);
    legendesea2.transition().delay(3000).duration(2000).style("opacity", 1);

    function mousemove() {
      var x0 = x2.invert(d3.pointer(event)[0]), //d3v6
        // var x0 = x.invert(d3.mouse(this)[0]), //d3v4
        i = bisectDate(data2, x0),
        d = data2[i];
      tooltip.attr(
        "transform",
        "translate(" + x2(d.date) + "," + y2(d.sea) + ")"
      );

      d3.select("#tooltip-date").text(dateFormat2(d.date));
      d3.select("#tooltip-close").text(" " + d.sea + " mm");
    }
  });

  var divsea = d3
    .select("#vis")
    .append("div")
    .attr("id", "textgraph")
    .append("div")
    .attr("class", "row");

  var textsea = divsea
    .append("div")
    .attr("class", "textgraph offset-1 col-10 offset-1")
    .append("text")
    .text(
      "L’augmentation du niveau de la mer menace 20 % de la population mondiale qui vit à moins de 30 km des côtes, pour beaucoup dans des métropoles côtières. Les espaces littoraux sont à la fois des écosystèmes et des territoires fragiles où se concentrent les populations et les activités économiques, ils sont donc particulièrement vulnérables."
    );
  document.getElementById("textgraph").style.animation = "fadeIn 4s";

  var choix2 = d3
    .select("#vis")
    .append("div")
    .attr("id", "CHOIX")
    .attr("class", "clearfix")
    .append("div")
    .attr("class", "bg-info clearfix");

  choix2
    .append("button")
    .attr("type", "button")
    .attr(
      "class",
      "btn btn-secondary float-left navigation grapheBanquisebutton"
    )
    .text("Revoir l'évolution de la superficie de la banquise");
  choix2
    .append("button")
    .attr("type", "button")
    .attr("class", "btn btn-secondary navigation float-right finbutton")
    .text("Finir l'histoire");

  document.getElementById("CHOIX").style.animation = "fadeIn 4s";

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
  function showBanquise() {
    d3.selectAll("svg").remove();
    d3.selectAll("#textgraph").remove();
    d3.selectAll("#homediv").remove();
    d3.selectAll(".navigation").remove();
    d3.selectAll("#CHOIX").remove();
    banquise();
  }

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
