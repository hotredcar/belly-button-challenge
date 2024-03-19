
// Define URL
const url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json';

// Define HTML global selectors 
let selDataset = d3.select("#selDataset");
let selDemoInfo = d3.select("#sample-metadata");

// Initialize Page
initialization();

// Function: Initialization 
function initialization() {

    // Log Initialization 
    console.log('Initialiazation');

    d3.json(url).then(function(data) {

        // Log keys and arrays
        console.log("Keys: " + Object.keys(data));
        console.log(data);

        // Create Test Subject ID Selector
        let names = data.names;
        names.forEach(name => selDataset.append("option").text(name).property("value", name));
 
        // Setup with first ID
        let select = names[0];

        // Display Demo Info
        displayDemoInfo(select, data);

        // Draw the Bar Plot
        drawBarPlot(select, data);

        // Draw the Bubble Chart
        drawBubbleChart(select, data);

        // // Draw the Gauge Chart
        // drawGaugeChart(select, data);
    });
};  

// Function: Populate Demographic Information 
function displayDemoInfo(select, data) {

    // Log Display Demo Info and ID 
    console.log("Display Demo Info, ID: " + select);

    // Select correct ID
    let metadata = data.metadata.filter(item => item.id == select);
 
    // Clear existing data
    selDemoInfo.html("");
 
    // Populate demographic information
    Object.entries(metadata[0]).forEach(([key, value]) => {
        selDemoInfo.append('h6')
            .style('font-size', '12px')
            .text(`${key.toUpperCase()}: ${value}`);
    });
}

// Function: Draw BarPlot for Top 10 OTUs Found  
function drawBarPlot(select, data) {

    // Log Barplot and ID 
    console.log('Barplot, ID: ' + select);

    // Select correct ID
    let selection = data["samples"].filter(item => item["id"] == select);
 
    // Inserting data into arrays 
    selection = selection[0]
    let sampleValues = selection.sample_values;
    let otu_ids = selection.otu_ids;
    let otu_labels = selection.otu_labels;

    // Creating/combining and array of objects for sorting 
    let combinedL = [];

    for (let i=0; i<sampleValues.length; i++){
        let sampleValue = sampleValues[i];
        let otu_id = `OTU ${otu_ids[i]}`;
        let otu_label = otu_labels[i];

        let combining_obj = {'otu_ids': otu_id, 'sample_values': sampleValue, 'otu_labels': otu_label, };
        combinedL.push(combining_obj);
    }

    // Sort list by descending order
    let sortedDesc = combinedL.sort((a,b) => b-a);
 
    // Select only the top 10 list
    let sliced10 = sortedDesc.slice(0, 10);
  
    // Extract sample values, OTU IDs, and OTU labels from each item in the sliced list
    // Map data and reverse the order for plotting horizontal bar (top to bottom, highest to lowest)
    let sampleValueList = sliced10.map(item => item.sample_values).reverse(); 
    let otu_idList = sliced10.map(item => item.otu_ids).reverse();
    let otu_labelList = sliced10.map(item => item.otu_labels).reverse(); 

    // Plot the horizontal bar
    let trace = {
                    x: sampleValueList,
                    y: otu_idList,
                    text: otu_labelList,
                    type: 'bar',
                    orientation: 'h'
                };

    let traceData = [trace];

    let layout = {
                    title: "Top 10 OTUs Found",
                    height: 500,
                    width: 400,
                };

    Plotly.newPlot("bar", traceData, layout);
}

// Function: Draw Bubble Chart 
function drawBubbleChart(select, data) {

    // Log Bubble Chart and ID
    console.log('Bubble Chart, ID: ' + select);

    // Select correct ID
    let selection = data["samples"].filter(item => item["id"] == select);
    selection = selection[0];

    // Plot bubble chart
    let trace = {
        x: selection.otu_ids,
        y: selection.sample_values,
        text: selection.otu_labels,
        type: 'bubble',
        mode: 'markers',
        marker: {   
                    color: selection.otu_ids,
                    size: selection.sample_values,
                    colorscale: 'Viridius'
                }    
             };

    let traceData = [trace];

    let layout = {
                    showlegend: false,
                    height: 500,
                    width: 800,
                    xaxis: { title: "OTU ID"}
                };

    Plotly.newPlot("bubble", traceData, layout);
};

// Function: Refer to HTML script, in the event that there is a change in Dataset do this:   
function optionChanged (select) {

    d3.json(url).then(function(data) {

        // Display Demo Info
        displayDemoInfo(select, data);

        // Draw the Bar Plot
        drawBarPlot(select, data);

        // Draw the Bubble Chart
        drawBubbleChart(select, data);

        // // Draw the Gauge Chart
        // drawGaugeChart(idNum);
    });
}
