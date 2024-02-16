import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import axios from "axios";
import mapData from "./../data/countries.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";


const MyMap = () => {
  const [color, setColor] = useState("#ffff00");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (country_name) => {
    try {
      const response = await axios.get(`https://csirt-be.onrender.com/teams/countries/${country_name}`);
      setData(response.data);
    } catch (error) {
      setError(error);
    }
  };


  useEffect(() => {
    console.log(mapData);
  }, []);

  const countryStyle = {
    fillColor: "red",
    fillOpacity: 1,
    color: "black",
    weight: 2,
  };

  const africaCenter = [4.6, 10.5]; // Center coordinates for Africa

  const changeCountryColor = (event) => {
    console.log("----------------",event.target.feature.properties.ADMIN);
    fetchData(event.target.feature.properties.ADMIN)
    // event.target.setStyle({
    //   color: "green",
    //   fillColor: color,
    //   fillOpacity: 1,
    // });
  };
  

  const onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    console.log(countryName);
   
    layer.bindPopup(countryName);
    // passing country name to function

    layer.options.fillOpacity = Math.random(); //0-1 (0.1, 0.2, 0.3)
    // const colorIndex = Math.floor(Math.random() * colors.length);
    // layer.options.fillColor = colors[colorIndex]; //0

    layer.on({
      click: changeCountryColor,
    });
  };

  const colorChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>My Map</h1>
      <MapContainer style={{ height: "85vh" }} zoom={4} center={africaCenter}>
        <GeoJSON
          style={countryStyle}
          data={mapData.features}
          onEachFeature={onEachCountry}
        />
      </MapContainer>
      {/* <input type="color" value={color} onChange={colorChange} /> */}
    </div>
  );
};

export default MyMap;
