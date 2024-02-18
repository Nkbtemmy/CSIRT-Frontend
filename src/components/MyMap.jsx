import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import { getCountryCode, getCountryData, getCountryDataList, getEmojiFlag } from 'countries-list'
import axios from "axios";
import mapData from "./../data/countries.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

const MyMap = () => {
  const [color, setColor] = useState("#ffff00");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState(null);

  const fetchData = async (country_code) => {
    try {
      const response = await axios.get(`https://csirt-be.onrender.com/teams/countries/?country=${country_code}`);
      setData(response.data);
      console.log("------response--------", response.data)
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (country) {
      fetchData(getCountryCode(country));
    }
    console.log("---------------data----------::", data);
  }, [country]);

  const africaCenter = [4.6, 10.5]; // Center coordinates for Africa

  const changeCountryCode = (event) => {
    const countryName = event.target.feature.properties.ADMIN;
    setCountry(countryName);
  };

  const onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;

    layer.bindPopup(getPopupContent(countryName));
    
    layer.on({
      click: changeCountryCode,
    });
  };

  const getPopupContent = (countryName) => {
    if (data) {
      let popupContent = `<b>${countryName}</b><br/><ul>`;
      
      data.forEach(team => {
          popupContent += `<li>Team: ${team.name}</li>`;
      });

      popupContent += "</ul>";
      
      return popupContent;
    } else {
      return `<b>${countryName}</b><br/>Loading data...`;
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>My Map</h1>
      <MapContainer style={{ height: "85vh" }} zoom={4} center={africaCenter}>
        <GeoJSON
          style={{ fillColor: "red", fillOpacity: 1, color: "black", weight: 2 }}
          data={mapData.features}
          onEachFeature={onEachCountry}
        />
      </MapContainer>
    </div>
  );
};

export default MyMap;
