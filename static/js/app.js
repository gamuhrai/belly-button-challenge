// Get the bacteria endpoint
const bacteria = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(bacteria).then(function(data) {
  console.log(data);
    // Sample data (replace with your actual data)
var testSubjectIDs = data.names;

// Get a reference to the <select> element
var dropdown = document.getElementById("selDataset");

// Loop through the testSubjectIDs array and add options to the dropdown
for (var i = 0; i < testSubjectIDs.length; i++) {
  var option = document.createElement("option");
  option.text = testSubjectIDs[i];
  option.value = testSubjectIDs[i];
  dropdown.appendChild(option);
}
// Initialize the page with the default dataset
  var defaultDataset = testSubjectIDs[0];
  updatePlotly(defaultDataset);
});

 // Function to update the chart based on the selected dataset
function updatePlotly(selectedDataset) {
  // Filter the data for the selected dataset
  var filteredData = data.samples.filter(sample => sample.id === selectedDataset)[0];

  // Sort the data by sample_values in descending order
  var sortedData = filteredData.sample_values.slice(0, 10).reverse();
  var otuLabels = filteredData.otu_ids.slice(0, 10).reverse().map(otu_id => `OTU ${otu_id}`);
  var hoverText = filteredData.otu_labels.slice(0, 10).reverse();

  // Create the bar chart
  var trace = {
    x: sortedData,
    y: otuLabels,
    type: 'bar',
    orientation: 'h',
    text: hoverText
  };

  var layout = {
    title: `Top 10 OTUs for Test Subject ${selectedDataset}`,
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU IDs" }
  };

  var data = [trace];

  Plotly.newPlot("plot", data, layout);
}

// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", function() {
  var selectedDataset = d3.select("#selDataset").property("value");
  updatePlotly(selectedDataset);
});