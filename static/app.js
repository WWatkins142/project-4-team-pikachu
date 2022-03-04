// function to populate the metadata
function draftinformation(sample)
{
    //console.log(sample);

    // use d3.json to get data
    d3.json("draft.json").then((data) => {
        // grab all of the metadata
        let metaData = data.metadata;
        //console.log(metaData);

        //filter based on the value of the sample ( one result from dataset)
        let result = metaData.filter(sampleResult => sampleResult.id == sample);
        //console.log(result);

        // access index 0 from array
        let resultData = result[0];
        //console.log(resultData);
        
        // clear metadata 
        d3.select("#sample-metadata").html("");

        // get value key using Object.entries
        Object.entries(resultData).forEach(([key, value])=>{
            // at to the demographics section sample data
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);
        });
    });
}
// function to initialize the dashboard
function initalize()
{

    //let data = d3.json("samples.json");
    //console.log(data);

    // access dropdown selector from index.html file
    var select = d3.select("#selDataset");

    // use d3.json  to get the data
    d3.json("samples.json").then((data) => {
        let sampleNames = data.names; // array of the names only
        //console.log(sampleNames);

        // use a forEach in order to create 
        //options for each sample in the selector

        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);
        });

        // when initialized, pass in the information for the first sample
        let sample1 = sampleNames[0];

        // call the function to build the metadata
        demographicInfo(sample1);

    });
}
// function to update the dashboard
function optionChanged(item)
{
    // call update to metadata
    demographicInfo(item);
  
    
}
// call the initialize function
initalize();
