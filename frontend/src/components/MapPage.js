import React, { useState, useEffect } from "react";
import peopleService from "../services/people";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapPage = () => {
  const [locationName, setLocationName] = useState("");
  //const [markers, setMarkers] = useState([[60.1695, 24.9354]]);
  const [markers, setMarkers] = useState([]);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const people = await peopleService.getAll();
      setPeople(people);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const geocodeLocationName = async (locationName) => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${locationName}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setMarkers((prevMarkers) => [
          ...prevMarkers,
          [parseFloat(lat), parseFloat(lon)],
        ]);
      } else {
        console.error(`Location ${locationName} not found!`);
      }
    };

    if (people.length > 0) {
      const uniqueAndNotEmptyBirthPlaces = Array.from(
        new Set(
          people
            .map((x) => x?.birthPlace)
            .filter((birthPlace) => birthPlace && birthPlace.trim() !== "")
        )
      );

      uniqueAndNotEmptyBirthPlaces.forEach((place) => {
        geocodeLocationName(place);
      });
    }
  }, [people]);

  const handleMapCreated = (map) => {
    map.on("click", function (event) {
      const newMarker = event.latlng;
      setMarkers([...markers, newMarker]);
    });
  };

  const handleLocationChange = (e) => {
    setLocationName(e.target.value);
  };

  const submitLocation = async () => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${locationName}`
    );
    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      setMarkers([...markers, [parseFloat(lat), parseFloat(lon)]]);
    } else {
      alert("Location not found!");
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center", margin: "10px" }}>
        <input
          value={locationName}
          onChange={handleLocationChange}
          placeholder="Kirjoita sijainti..."
          style={{ padding: "10px", width: "200px" }}
        />
        <button
          className="btn btn-primary"
          onClick={submitLocation}
          style={{ margin: "10px" }}
        >
          Lisää sijainti
        </button>
        <div>
          <span>Henkilöiden syntymäkunnat kartalla. </span>
          <span style={{ color: "red" }}>
            Huom! Itse lisätty sijainti ei tallennu tietokantaan, vaan katoaa
            sivun päivityksen myötä.
          </span>
        </div>
      </div>
      <MapContainer
        center={[60.1695, 24.9354]}
        zoom={5}
        style={{ width: "80%", height: "1000px", margin: "20px auto" }}
        whenCreated={handleMapCreated}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((position, idx) => (
          <Marker key={idx} position={position}>
            <Popup>Marker #{idx + 1}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
