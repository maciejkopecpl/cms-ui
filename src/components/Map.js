import PropTypes from "prop-types";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../pages";
import { THEME_STYLES } from "../utils/constants";

export default function Map(props) {
  const googleMapRef = useRef();
  const { latitude, longitude } = props;
  const { style } = useContext(ThemeContext);

  const initializeMap = useCallback(() => {
    if (typeof window !== `undefined` && typeof window.google !== "undefined") {
      googleMapRef.current = new window.google.maps.Map(
        document.getElementById("map"),
        {
          center: { lat: latitude, lng: longitude },
          zoom: 12,
          disableDefaultUI: true,
          styles: style === THEME_STYLES.dark ? nightStyle : [],
        }
      );
      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: googleMapRef.current,
      });
    }
  }, [latitude, longitude, style]);

  const createMap = useCallback(() => {
    const script = document.createElement("script");
    script.id = "googleMapsApi";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}`;
    script.defer = true;
    script.async = true;
    script.onload = () => {
      initializeMap();
    };

    document.body.appendChild(script);
  }, [initializeMap]);

  useEffect(
    () =>
      document.getElementById("googleMapsApi") ? initializeMap() : createMap(),
    [initializeMap, createMap]
  );

  return (
    <div
      id="map"
      ref={googleMapRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

Map.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

const nightStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];
