import React, { useState, useEffect } from "react";
import peopleService from "../services/people";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet/dist/images/marker-shadow.png";
import "../assets/worldMap.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const USER_AGENT = "FamilyTreeApp/1.0 (LocalHostForNow)";

const MapPage = () => {
  const [locationName, setLocationName] = useState("");
  const [markers, setMarkers] = useState([]);
  const [people, setPeople] = useState([]);

  const geocodeCache = {};

  const geocodeLocationName = async (locationName) => {
    if (geocodeCache[locationName]) {
      return geocodeCache[locationName];
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${locationName}`,
      {
        headers: {
          "User-Agent": USER_AGENT,
        },
      }
    );

    const data = await response.json();
    if (data && data.length > 0) {
      const { lat, lon } = data[0];
      const result = [parseFloat(lat), parseFloat(lon)];
      geocodeCache[locationName] = result;
      return result;
    }

    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPeople = await peopleService.getAll();
      setPeople(fetchedPeople);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchGeoData = async () => {
      if (people.length > 0) {
        const uniqueAndNotEmptyBirthPlaces = Array.from(
          new Set(
            people
              .map((x) => x?.birthPlace)
              .filter((birthPlace) => birthPlace && birthPlace.trim() !== "")
          )
        );

        for (let place of uniqueAndNotEmptyBirthPlaces) {
          const coords = await geocodeLocationName(place);
          if (coords) {
            setMarkers((prevMarkers) => [...prevMarkers, coords]);
          }
          await new Promise((r) => setTimeout(r, 1000)); // wait for 1 second before the next request
        }
      }
    };

    fetchGeoData();
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
    const coords = await geocodeLocationName(locationName);
    if (coords) {
      setMarkers([...markers, coords]);
    } else {
      alert("Location not found!");
    }
  };

  return (
    <div>
      <div className="mapOptionsContainer">
        <input
          value={locationName}
          onChange={handleLocationChange}
          placeholder="Kirjoita sijainti..."
          className="mapInput"
        />
        <button className="btn btn-primary mapButton" onClick={submitLocation}>
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
        className="mapContainer"
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
      <div className="attributionContainer">
        Map data ©{" "}
        <a href="https://www.openstreetmap.org/copyright">
          OpenStreetMap contributors
        </a>{" "}
        under ODbL. Shared under ODbL.
      </div>
    </div>
  );
};

export default MapPage;
