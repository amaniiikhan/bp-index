// ArrestMap.tsx
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Chart, PieController, ArcElement, Title, Tooltip, Legend } from 'chart.js';
// Register the required components
Chart.register(PieController, ArcElement, Title, Tooltip, Legend);
import React, { useEffect, useRef, useState, useCallback } from "react";
import AIData from "components/ArrestData/AI.json" assert { type: 'json' };

interface ArrestMapProps {
    policeDistricts: any; // You can replace `any` with a more specific type if you know the structure of the data
}


const ArrestMap: React.FC<ArrestMapProps> = ({ policeDistricts }) => {
    // for the map
    const mapRef = useRef(null);


    useEffect(() => {

        function initMap() {

            if (!mapRef.current || mapRef.current._leaflet_id) {
                return;
            }

            // Adjust the zoom level (higher number for a closer view)
            const zoomLevel = 12;
            // Set the coordinates for the center of Massachusetts
            const map = L.map(mapRef.current).setView([42.3601, -71.0589], zoomLevel);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            return map;
        }
        

        // calculate the percentage # of cases/ # of total cases 
        function updateDistrictPopups(geoJSONLayer: any, districtCounts: any) {
            if (!geoJSONLayer) return; // added null check
        
            // Update the popup content for each district to include the count and percentage
            geoJSONLayer.eachLayer((layer: any) => {
            if (layer.feature) {
                const district = layer.feature.properties.DISTRICT;
                const count = districtCounts[district] || 0;
                // const percentage = ((count / Object.values(districtCounts).reduce((a: number, b: number) => a + b, 0)) * 100).toFixed(2);
                const districtCountsArray = Object.values(districtCounts);
                const totalDistrictCounts = districtCountsArray.reduce((a: number, b: number) => a + b, 0);
                const percentage = ((count / Number(totalDistrictCounts)) * 100).toFixed(2);

                layer.setPopupContent(`District: ${district}<br> Arrest Count: ${count} <br> percentage:${percentage}`);
            }
            });
        }
        
        async function plotCoordinates(map, csvData) {
            const districtCounts = {};
        
            for (const { latitude, longitude, DISTRICT, OFFENSE_CODE, OFFENSE_DESCRIPTION, age_code, sex_label, race_label, ethnicity_label,street_name } of csvData) {
                // setting for each dots 
                if (!isNaN(latitude) && !isNaN(longitude)) {
                    const marker = L.circleMarker([latitude, longitude], {
                    radius: 2,
                    fillColor: '#FB9478',
                    color: 'red',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8,
                    });

                    if (map) {
                        marker.addTo(map);
                    }

                    marker.bindPopup(`Offense Code: ${OFFENSE_CODE}<br>
                            Offense Discription: ${OFFENSE_DESCRIPTION}<br>
                            Location: ${street_name}<br>
                            Age: ${age_code}<br>
                            Gender: ${sex_label}<br>
                            Race: ${race_label}<br>
                            Ethnicity: ${ethnicity_label}`
                            );

                    marker.on('mouseover', function (e) {this.openPopup();});
                    marker.on('mouseout' , function (e) {this.closePopup();});

                } else {
                    console.warn(`Invalid coordinate: (${latitude}, ${longitude})`);
                }
        
            // Count the occurrences of each district
            if (districtCounts.hasOwnProperty(DISTRICT)) {
                districtCounts[DISTRICT]++;
            } else {
                districtCounts[DISTRICT] = 1;
            }
            }
        
            return districtCounts;
        }
        
        
        async function countCasesByDistrict(apiKey) {
            const map1 = initMap();
            const csvData = AIData
            const geojsonData = policeDistricts

            // mark district 
            const geoJSONLayer = L.geoJSON(geojsonData, {
                style: { color: "blue", weight: 2, opacity: 0.5 },
                onEachFeature: (feature, layer) => {
                const district = feature.properties.DISTRICT;
                layer.bindPopup(`District: ${district}`);
                },
            });

            if (map1) {
                geoJSONLayer.addTo(map1);
            }

        
            const districtCounts = await plotCoordinates(map1, csvData);
        
            // Update the popup content for each district with count and percentage
            updateDistrictPopups(map1, districtCounts);
        
            // Set up click events for each layer after districtCounts is available

            geoJSONLayer.eachLayer((layer: any) => {
                layer.on('click', () => {
                const selectedDistrict = layer.feature.properties.DISTRICT;            
            });
            });
        }


        // insert google map api 
        countCasesByDistrict("AIzaSyAPfrh-jrkGMcF-ceXjSFVC75ivNf1oMCA");

    }, []);
    
    return (
        <div>
        <div ref={mapRef} style={{ height: "700px", width: "1400px" }}></div>
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
        </div>
        </div>
    );
  
};

export default ArrestMap;
