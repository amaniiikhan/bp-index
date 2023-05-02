
// ArrestMap.tsx
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Chart from "chart.js/auto";

const ArrestMap = () => {
  const mapRef = useRef(null);
  const pieChartRef = useRef(null);
  const offensePieChartRef = useRef(null);

useEffect(() => {
    if (!mapRef.current || !pieChartRef.current || !offensePieChartRef.current)
      return;

    // Wrap your map-related code in a function, e.g., initializeMap
      // Your map.js code goes here with the necessary modifications
      async function fetchData(url) {
        const response = await fetch(url);
        const text = await response.text();
        const data = text.trim().split('\n').slice(1).map(row => {
            const [OFFENSE_CODE, OFFENSE_DESCRIPTION, DISTRICT, Type_of_Arrest,
                age_code, sex_label, race_label, ethnicity_label, latitude,
                longitude] = row.split(',').map(str => str.trim());
            
            return {
                latitude: Number(latitude),
                longitude: Number(longitude),
                district: DISTRICT,
                offense_code: OFFENSE_CODE,
                offense_discription: OFFENSE_DESCRIPTION,
                age: age_code,
                gender: sex_label,
                race: race_label,
                ethnicity: ethnicity_label,
            };
        });
        return data;
    }
    
    async function fetchGeoJson(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    
      function initMap() {
        // Adjust the zoom level (higher number for a closer view)
        const zoomLevel = 12;
        // constant 
        // const map = L.map('map').setView(massachusettsCoords, zoomLevel);
        // Set the coordinates for the center of Massachusetts
        const map = L.map(mapRef.current).setView([42.3601, -71.0589], zoomLevel);

    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    
        return map;
    }

    async function getStreetName(latitude, longitude, apiKey) {
        const googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
        const response = await fetch(googleUrl);
        const data = await response.json();
    
        if (data.status === "OK") {
            const result = data.results[0];
            const street = result.address_components.find(component => component.types.includes("route"));
            return street ? street.long_name : "Unknown";
        } else {
            console.error(`Error fetching street name: ${data.status}`);
            return "Unknown";
        }
    }
    
    function updatePieChart(chart, districtCounts, selectedDistrict) {
        const totalCount = Object.values(districtCounts).reduce<number>((sum: number, count: number) => sum + count, 0);
        const selectedCount = districtCounts[selectedDistrict] || 0;
        const otherCount = totalCount - selectedCount;
      
        chart.data.labels = [selectedDistrict, 'Others'];
        chart.data.datasets[0].data = [selectedCount, otherCount];
        chart.update();
      }
      
    
    
      function updateDistrictPopups(geoJsonLayer, districtCounts) {
        // Calculate the total number of cases
        const totalCount = Object.values(districtCounts).reduce<number>((sum: number, count: number) => sum + count, 0);
      
        // Update the popup content for each district to include the count and percentage
        geoJsonLayer.eachLayer((layer: any) => {
          if (layer.feature) {
            const district = layer.feature.properties.DISTRICT;
            const count = districtCounts[district] || 0;
            const percentage = ((count / totalCount) * 100).toFixed(2);
            layer.bindPopup(`District: ${district}<br>Count: ${count}<br>Percentage: ${percentage}%`);
          }
        });
      }
      
      
      
    
    function getOffenseDataByDistrict(csvData, selectedDistrict) {
        const offenseCounts = {};
    
        for (const {district, offense_discription} of csvData) {
            if (district === selectedDistrict) {
                if (offenseCounts.hasOwnProperty(offense_discription)) {
                    offenseCounts[offense_discription]++;
                } else {
                    offenseCounts[offense_discription] = 1;
                }
            }
        }
    
        const offenseLabels = Object.keys(offenseCounts);
        const offenseData = Object.values(offenseCounts);
    
        return {offenseLabels, offenseData};
    }
    
    function updateOffensePieChart(chart, offenseLabels, offenseData) {
        chart.data.labels = offenseLabels;
        chart.data.datasets[0].data = offenseData;
        chart.update();
    }
    
    
    async function plotCoordinates(map, csvData,apiKey) {
        const districtCounts = {};
    
        for (const {latitude, longitude, district, offense_code,offense_discription, age, gender,race, ethnicity} of csvData) {
            if (!isNaN(latitude) && !isNaN(longitude)) {
                const streetName = await getStreetName(latitude, longitude, apiKey);
                const marker = L.circleMarker([latitude, longitude], {
                    radius: 2,
                    fillColor: '#FB9478',
                    color: 'red',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8,
                }).addTo(map);
                marker.bindPopup(`Offense Code: ${offense_code}<br>
                Offense Discription: ${offense_discription}<br>
                Age: ${age}<br>
                Gender: ${gender}<br>
                Race: ${race}<br>
                Ethnicity: ${ethnicity}`);
                marker.on('mouseover', function (e) {
                    this.openPopup();
                });
                marker.on('mouseout', function (e) {
                    this.closePopup();
                });
            } else {
                console.warn(`Invalid coordinate: (${latitude}, ${longitude})`);
            }
    
            // Count the occurrences of each district
            if (districtCounts.hasOwnProperty(district)) {
                districtCounts[district]++;
            } else {
                districtCounts[district] = 1;
            }
        }
    
        return districtCounts;
    }
    
    async function countCasesByDistrict(apiKey) {
        const map1 = initMap();
        const csvData = await fetchData('https://raw.githubusercontent.com/JQJQrush/DS4G/main/AI.csv');
        const geojsonData = await fetchGeoJson('https://raw.githubusercontent.com/JQJQrush/DS4G/main/Police_Districts.geojson');
    
        // Initialize the pie chart
        const ctx = pieChartRef.current.getContext("2d");
        const pieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: ['#004c6d','#7596b0']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        });
    
        const offenseCtx = offensePieChartRef.current.getContext("2d");

        const offensePieChart = new Chart(offenseCtx, {
            type: 'pie',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: ['#004c6d','#2a5e7d','#45708e','#5d839e','#7596b0','#8daac1','#a5bed3','#bdd3e5','#d6e8f7']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'left',
                        labels: {
                            boxWidth: 50, // Increase the box width
                            padding: 10, // Increase the padding between items
                        },
                    },
                },
            },
        });
        
        const geoJSONLayer = L.geoJSON(geojsonData, {
            style: {color: 'blue', weight: 2, opacity: 0.5},
            onEachFeature: (feature, layer) => {
                const district = feature.properties.DISTRICT;
                layer.bindPopup(`District: ${district}`);
            }
        }).addTo(map1);
    
    
        const districtCounts = await plotCoordinates(map1, csvData, apiKey);
    
        // Update the popup content for each district with count and percentage
        updateDistrictPopups(map1, districtCounts);
    
        // Set up click events for each layer after districtCounts is available
        // geoJSONLayer.eachLayer(layer => {
        //     layer.on('click', () => {
        //         const selectedDistrict = layer.feature.properties.DISTRICT;
        //         updatePieChart(pieChart, districtCounts, selectedDistrict);
        
        //         const {offenseLabels, offenseData} = getOffenseDataByDistrict(csvData, selectedDistrict);
        //         updateOffensePieChart(offensePieChart, offenseLabels, offenseData);
        //     });
        // });

        geoJSONLayer.eachLayer((layer: any) => {
            layer.on('click', () => {
              const selectedDistrict = layer.feature.properties.DISTRICT;
              updatePieChart(pieChart, districtCounts, selectedDistrict);
          
              const {offenseLabels, offenseData} = getOffenseDataByDistrict(csvData, selectedDistrict);
              updateOffensePieChart(offensePieChart, offenseLabels, offenseData);
            });
          });
          
    


    }

    countCasesByDistrict("AIzaSyAPfrh-jrkGMcF-ceXjSFVC75ivNf1oMCA");
}, []);




return (
    <div>
      <div ref={mapRef} style={{ height: "1000px", width: "1600px" }}></div>
      <div
        style={{
          position: "absolute",
          top: "30px",
          left: "30px",
          zIndex: 1000,
          width: "250px",
          height: "250px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <canvas ref={pieChartRef}></canvas>
        </div>
        <div>
          <canvas ref={offensePieChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default ArrestMap;
