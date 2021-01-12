// Definition de la taille du svg
import { sealevel } from "./linechartsea.js";
import { viewHome } from "./home.js";
import { banquise } from "./chartbanquise.js";

export function testco2() {
  d3.select("#vis").append("svg").attr("id", "svg");

  var margin = { top: 50, right: 30, bottom: 30, left: 80 },
    width =
      document.getElementById("container").offsetWidth * 0.95 -
      margin.left -
      margin.right,
    height = 500 - margin.top - margin.bottom;

  // Attention ici il faut que le body possède déjà un DIV dont l'ID est chart
  // d3.select("svg").append("div").attr("id", "LineChart");

  var svg = d3
    .select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("class", "linechartco2")
    .attr("opacity", 1);

  var g = svg.attr(
    "transform",
    "translate(" + margin.left + "," + margin.top + ")"
  );

  // width = 0.8 * width;

  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  var parseTime = d3.timeParse("%Y-%m-%d");
  var dateFormat = d3.timeFormat("%d/%m/%Y");

  // Define the axes
  var xAxis = d3.axisBottom(x).ticks(10);
  var yAxis = d3.axisLeft(y).ticks(10);

  // pour tracer une droite
  var line = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.close));

  // pour le dégradé sous la courbe
  var area = d3
    .area()
    .x((d) => x(d.date))
    .y0(height)
    .y1((d) => y(d.close));

  // titre
  var titre = svg
    .append("text")
    .style("opacity", "0")
    .attr("x", width / 2)
    .attr("y", 0 + margin.top / 6)
    .attr("text-anchor", "middle")
    .style("fill", "#5a5a5a")
    .style("font-family", "Raleway")
    .style("font-weight", "300")
    .style("font-size", "24px")
    .text("Evolution du rejet de co2");

  function addTooltip() {
    // Création d'un groupe qui contiendra tout le tooltip plus le cercle de suivi
    var tooltip = svg
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

  d3.csv("co2_forecast.csv").then(function (data) {
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
    data.forEach((d) => {
      d.date = parseTime(d.year);
      d.close = +d.rate;
    });

    // data.sort((a, b) => a.date - b.date);

    x.domain(d3.extent(data, (d) => d.date));
    y.domain(d3.extent(data, (d) => d.close));

    // text label for the x axis
    var xlabel = svg
      .append("text")
      .style("opacity", "0")
      .attr("transform", "translate(" + width / 2 + " ," + (height + 30) + ")")
      .style("text-anchor", "middle")
      .style("font-size", "0.8em")
      .text("Date");

    // text label for the y axis
    var ylabel = svg
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
      .text("CO2 rejeté (ppm)");

    // Add the X Axis
    var xAxisL = svg
      .append("g")
      .attr("class", "x leoLine")
      .style("opacity", "0")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    // Add the Y Axis
    var yAxisL = svg
      .append("g")
      .attr("class", "y leoLine")
      .style("opacity", "0")
      .call(yAxis);

    titre.transition().duration(2000).style("opacity", "1");
    xlabel.transition().duration(2000).style("opacity", "1");
    xAxisL.transition().duration(2000).style("opacity", "1");
    ylabel.transition().duration(2000).style("opacity", "1");
    yAxisL.transition().duration(2000).style("opacity", "1");

    var linePath = svg
      .append("path")
      .datum(data)
      .style("fill", "none")
      .style("stroke", "#919191") // COULEUR
      .style("stroke-width", "1.5px")
      .style("opacity", "1")
      // .attr("d", line2)
      .attr(
        "d",
        line(
          data.filter(function (d) {
            return d.id < 754;
          })
        )
      );

    // Variable to Hold Total Length

    var linePathPredict = svg
      .append("path")
      .datum(data)
      .style("fill", "none")
      .style("stroke", "#FF0000") // COULEUR
      .style("stroke-width", "1.5px")
      .style("opacity", "1")
      // .attr("d", line2)
      .attr(
        "d",
        line(
          data.filter(function (d) {
            return d.id > 752;
          })
        )
      );

    var totalLengthPredict = linePathPredict.node().getTotalLength();
    linePathPredict
      .attr("stroke-dasharray", totalLengthPredict + " " + totalLengthPredict)
      .attr("stroke-dashoffset", totalLengthPredict)
      .transition() // Call Transition Method
      .delay(4000)
      .duration(3000) // Set Duration timing (ms)
      .ease(d3.easeLinear) // Set Easing option
      .attr("stroke-dashoffset", 0); // Set final value of dash-offset for transition

    var totalLength = linePath.node().getTotalLength();

    // Set Properties of Dash Array and Dash Offset and initiate Transition
    linePath
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition() // Call Transition Method
      .delay(1000)
      .duration(3000) // Set Duration timing (ms)
      .ease(d3.easeLinear) // Set Easing option
      .attr("stroke-dashoffset", 0); // Set final value of dash-offset for transition

    // Le reste du code ira ici
    // Debut prevision id=753
    svg
      .append("linearGradient")
      .attr("id", "areachart-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", y(d3.min(data, (d) => d.close)))
      .attr("y2", y(d3.max(data, (d) => d.close)))
      .selectAll("stop")
      .data([
        { offset: "0%", color: "#f7f7f7" },
        { offset: "100%", color: "#252525" }
      ]) // couleur dégradé
      //  https://observablehq.com/@d3/color-schemes?collection=@d3/d3-scale-chromatic
      .enter()
      .append("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.color);

    var areaPath = svg
      .append("path")
      .datum(data)
      .style("fill", "url(#areachart-gradient)")
      .style("opacity", "0")
      .attr(
        "d",
        area(
          data.filter(function (d) {
            return d.id < 753;
          })
        )
      );

    //  decommenter si on veut afficher le dégradé sous la courbe

    areaPath
      .transition() // Call Transition Method
      .delay(3200)
      .duration(4000) // Set Duration timing (ms)
      .style("opacity", 1); // Set final value of dash-offset for transition

    // tooltip
    var tooltip = addTooltip();
    var bisectDate = d3.bisector((d) => d.date).left; // prend la date la plus proche du curseur à gauche
    // rectangle du tooltip
    svg
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

    var legendeCO21 = svg
      .append("circle")
      .style("opacity", 0)
      .attr("cx", 80)
      .attr("cy", height - 300)
      .attr("r", 6)
      .style("fill", "#919191");

    var legendeCO22 = svg
      .append("circle")
      .style("opacity", 0)
      .attr("cx", 80)
      .attr("cy", height - 275)
      .attr("r", 6)
      .style("fill", "#FF0000");

    var legendeCO21text = svg
      .append("text")
      .style("opacity", 0)
      .style("fill", "#919191")
      .attr("x", 95)
      .attr("y", height - 295)
      .text("Données mesurées");

    var legendeCO22text = svg
      .append("text")
      .style("opacity", 0)
      .style("fill", "#FF0000")
      .attr("x", 95)
      .attr("y", height - 270)
      .text("Prédictions");
    legendeCO21text.transition().delay(3000).duration(2000).style("opacity", 1);
    legendeCO22text.transition().delay(3000).duration(2000).style("opacity", 1);
    legendeCO21.transition().delay(3000).duration(2000).style("opacity", 1);
    legendeCO22.transition().delay(3000).duration(2000).style("opacity", 1);

    function mousemove() {
      var x0 = x.invert(d3.pointer(event)[0]), //d3v6
        // var x0 = x.invert(d3.mouse(this)[0]), //d3v4
        i = bisectDate(data, x0),
        d = data[i];
      tooltip.attr(
        "transform",
        "translate(" + x(d.date) + "," + y(d.close) + ")"
      );

      d3.select("#tooltip-date").text(dateFormat(d.date));
      d3.select("#tooltip-close").text(" " + d.close + " ppm");
    }

    // svg.selectAll("path").transition().duration(500).style("opacity", 0);
    // svg.selectAll("g").transition().duration(500).style("opacity", 0);
  });
  // Data are reported as a dry air mole fraction defined as the number
  //  of molecules of carbon dioxide divided by the number of all molecules
  //   in air, including CO2 itself, after water vapor has been removed.
  //    The mole fraction is expressed as parts per million (ppm).
  //    Example: 0.000400 is expressed as 400 ppm.
  // https://www.esrl.noaa.gov/gmd/ccgg/trends/
  var divco2 = d3
    .select("#vis")
    .append("div")
    .attr("id", "textgraph")
    .append("div")
    .attr("class", "row");

  var textco2 = divco2
    .append("div")
    .attr("class", "textgraph offset-1 col-10 offset-1")
    .append("text")
    .text(
      "Sur les 60 dernières années, les émissions de CO2 ont augmenté de manière exponentielle. L’origine de cette augmentation s’explique par l’augmentation des activités humaines. Les émissions de CO2 font partie des gaz à effet de serre qui sont responsables du réchauffement climatique. Regardons à présent leur impact sur l’évolution de la superficie de la banquise."
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
    .attr("class", "btn btn-secondary float-left navigation homebutton")
    .text("Retour à l'accueil");
  choix
    .append("button")
    .attr("type", "button")
    .attr(
      "class",
      "btn btn-secondary float-right navigation grapheBanquisebutton"
    )
    .text("Voir l'évolution de la superficie de la banquise");

  document.getElementById("CHOIX").style.animation = "fadeIn 4s";

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
}
