$(document).ready(function() {

    $.getJSON('Life_Expectancy.json', function(data){

    var years = [];
    var countries = [];
    var seriesOptions = [],
        seriesCounter = 0;


var grouped = _.chain(data)
           .groupBy('Metric')
           .mapObject(function(item) { return _.groupBy(item, 'Country_Name');})
           .value();        

 console.log(grouped);
 console.log(grouped.At_Birth_Both_Sexes.Burundi)          
      
for (var i = 0; i < data.length; i++){

            years.push(data[i].Year)
            countries.push(data[i].Country_Name)
            years = years.filter((x, i, a) => a.indexOf(x) == i).reverse(); /// getting unique year values into array
            years = years.sort(function(a,b){return a-b}); // sorting values in year array in ascending order
            countries = countries.filter((x, i, a) => a.indexOf(x) == i); /// getting unique country values into array
            
        }

        var max_year = Math.max(...years);
        var min_year = Math.min(...years);
        console.log(max_year);
        console.log(min_year);
        console.log(years);
        console.log(countries);

        var data1 = [];
        var metric_value = [];
        var metric_year;
         var data2 = {}; 
        var metric_name = [];

        console.log(data);

        // Gets unique metric names from array

        for (var i = 0; i < data.length; i++){
           if(metric_name.indexOf(data[i].Metric) === -1){
                metric_name.push(data[i].Metric);        
            }        

        };

        console.log(metric_name);
        console.log(metric_name.length);


    for (var j =0; j < countries.length; j++){
            for (var i =0; i < years.length; i++){
                for (var k = 0; k < data.length; k++){
                
                    if (data[k].Country_Name == countries[j] && data[k].Year == years[i]){
                        
                      /* 
                       if (metric_name.indexOf(data[k].Metric) == -1 ){
                        metric_name.push(data[k].Metric);
                        metric_value.push(+data[k].Value);
              
                      } else { 
                        */

                        for (var l = 0; l < metric_name.length; l++) {

                            if(metric_name[l].indexOf(data[k].Metric) > -1){

                              data2["Country_Name"] = data[k].Country_Name;
                              data2["Code"] = data[k].Code;
                              data2["Indicator"] = data[k].Indicator;
                              data2["Range"] = data[k].Range
                              data2["Year"] = data[k].Year;
                              data2[data[k].Metric] = data[k].Value

                        } 
                      
                        
                      }
              
                    }
                        
              }

                    data1.push(data2);
                    var data2 = {};
                        
            }

        }

        console.log(data1);       



/*At_Age_60_Both_Sexes: 15.6
At_Age_60_Female: 16.2
At_Age_60_Male: 14.8
At_Birth_Both_Sexes: 50.8
At_Birth_Female: 53
At_Birth_Male: 48.6
Code: "bi"
Country_Name: "Burundi"
Indicator: "Life Expectancy"
Range: "NA"
Year: 2000
*/

function everything() {

    for (var i = 0; i < metric_name.length; i++) {
      var single = metric_name[i];
      var d = document.createElement("div");
      d.style.width = "910px"; 
      d.style.height = "350px";
      d.style.margin = "20px";
      d.id = single;
      d.class = "chart"
      $("body").append(d);         
    }
}

    everything();

  /// chart Life Expectancy Indicators - one chart for each metric and all countries /////////////////
 /*   

function createChart(){

   $(metric_name[0]).highcharts({
      
        chart: {
            type: 'scatter'
            },
        
        title: {
            text: metric_name[0]
              },

        xAxis: [{
              categories: years,
              reversed:true,
              title:{
                text: ' Year'
                   },
              crosshair: true,
              gridLineWidth:0
                }],

           plotOptions:{
                        scatter:
                               {lineWidth:2}           
                        },

        yAxis: [{ // Primary yAxis
                     labels: {
                             format: '{value}',
                              },

                      gridLineWidth:0,
                      title: {
                              text: 'metric_name[0]',
    
                             }
                      }],

        tooltip: {
            crosshairs: true,
            shared: true,
            valueSuffix: 'years'
                },
        
        legend: {
            enabled: true
                 },

        series: seriesOptions
    
            });

            };


            */

        $.each(metric_name, function (i, metric_name) {

                seriesOptions[i] = {
                    name: metric_name,
                    data: data1
                };

        seriesCounter += 1;

        if (seriesCounter === metric_name.length) {
                createChart();
            }

        });
  

    });

});
            
  

            
    