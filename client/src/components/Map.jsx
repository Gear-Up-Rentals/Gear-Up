import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

// longitude , latitude
const zoom = 12;

const MapboxMap = (props) => {
  const mapContainer = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Create a new map instance with the specified center point and zoom level
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: props.center,
      zoom: zoom,
      accessToken: import.meta.env.VITE_APP_ACCESS_TOKEN,
    });

    // Create a new marker at the center point and add it to the map
    const marker = new mapboxgl.Marker().setLngLat(props.center).addTo(map);

    // Store the marker instance in a ref
    markerRef.current = marker;

    // Cleanup function to remove the map and marker instances
    return () => {
      marker.remove();
      map.remove();
    };
  }, [props.center]);

  return <div ref={mapContainer} style={{ height: "500px" }} />;
};

export default MapboxMap;
