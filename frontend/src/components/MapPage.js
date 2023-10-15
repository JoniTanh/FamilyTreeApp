import React, { useState, useEffect } from "react";
import peopleService from "../services/people";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../assets/worldMap.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = defaultIcon;

const customIcon = new L.DivIcon({
  className: "custom-icon",
  html: `<svg viewBox="0 0 500 820" version="1.1" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule: evenodd; clip-rule: evenodd; stroke-linecap: round;">
  <defs>
      <linearGradient x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(2.30025e-15,-37.566,37.566,2.30025e-15,416.455,540.999)" id="map-marker-38-f">
          <stop offset="0" stop-color="rgb(255,0,0)"/>
          <stop offset="1" stop-color="rgb(255,85,85)"/>
      </linearGradient>
      <linearGradient x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(1.16666e-15,-19.053,19.053,1.16666e-15,414.482,522.486)" id="map-marker-38-s">
          <stop offset="0" stop-color="rgb(180,0,0)"/>
          <stop offset="1" stop-color="rgb(255,0,0)"/>
      </linearGradient>
  </defs>
  <g transform="matrix(19.5417,0,0,19.5417,-7889.1,-9807.44)">
      <path d="M416.544,503.612C409.971,503.612 404.5,509.303 404.5,515.478C404.5,518.256 406.064,521.786 407.194,524.224L416.5,542.096L425.762,524.224C426.892,521.786 428.5,518.433 428.5,515.478C428.5,509.303 423.117,503.612 416.544,503.612ZM416.544,510.767C419.128,510.784 421.223,512.889 421.223,515.477C421.223,518.065 419.128,520.14 416.544,520.156C413.96,520.139 411.865,518.066 411.865,515.477C411.865,512.889 413.96,510.784 416.544,510.767Z" stroke-width="1.1px" fill="url(#map-marker-38-f)" stroke="url(#map-marker-38-s)"/>
  </g>
</svg>
`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: markerShadow,
});

const USER_AGENT = "FamilyTreeApp/1.0 (LocalHostForNow)";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

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
            setMarkers((prevMarkers) => [
              ...prevMarkers,
              { position: coords, name: place, type: "default" },
            ]);
          }
          await new Promise((r) => setTimeout(r, 1000)); // wait for 1 second before the next request
        }
      }
    };

    fetchGeoData();
  }, [people]);

  const handleMapCreated = (map) => {
    map.on("click", function (event) {
      const newMarker = {
        position: event.latlng,
        name: `Clicked Location #${markers.length + 1}`,
        type: "userAdded",
      };
      setMarkers([...markers, newMarker]);
    });
  };

  const handleLocationChange = (e) => {
    setLocationName(e.target.value);
  };

  const submitLocation = async () => {
    const coords = await geocodeLocationName(locationName);
    if (coords) {
      const newMarker = {
        position: coords,
        name: locationName,
        type: "userAdded",
      };
      setMarkers([...markers, newMarker]);
      setLocationName("");
    } else {
      alert("Location not found!");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      submitLocation();
    }
  };

  return (
    <div>
      <div className="mapOptionsContainer">
        <input
          value={locationName}
          onChange={handleLocationChange}
          onKeyDown={handleKeyDown}
          placeholder="Kirjoita väliaikainen sijainti..."
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
        {markers.map((marker, idx) => (
          <Marker
            key={idx}
            position={marker.position}
            icon={marker.type === "userAdded" ? customIcon : defaultIcon}
          >
            <Popup>{capitalizeFirstLetter(marker.name)}</Popup>
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
