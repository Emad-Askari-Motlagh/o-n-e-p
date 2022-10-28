import { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import {
  MapContainer,
  Popup,
  Marker,
  TileLayer,
  useMapEvents,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";

const Map = () => {
  const [coords, setCoords] = useState([]);
  const position = [
    [51.503, -0.08],
    [51.505, -0.08],
    [51.506, -0.08],
  ];
  let [po, setNewPosition] = useState([
    [51.503, -0.08],
    [51.505, -0.08],
    [51.506, -0.08],
  ]);

  useEffect(() => {
    navigator.geolocation.watchPosition(
      (res) => {
        console.log(res.coords.latitude, res.coords.longitude);
        setCoords((current) => [res.coords.latitude, res.coords.longitude]);
      },
      (err) => {
        console.log(err);
      }
    );

    var oldValue = po[2][0];
    var oldv = po[2][1];
    setNewPosition((rr) => [rr[0], rr[1], [rr[2][0], rr[2][1]]]);
  }, []);

  return (
    <>
      <MapContainer
        className={styles.map_container}
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}
        scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker />
      </MapContainer>
    </>
  );
};

export default Map;

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const [coords, setCoords] = useState([]);
  const { panTo } = useMap();
  useEffect(() => {
    navigator.geolocation.watchPosition(
      (res) => {
        setCoords((current) => [res.coords.latitude, res.coords.longitude]);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  const map = useMapEvents({
    viewreset() {
      console.log("here");
    },

    autopanstart: () => {
      console.log("here");
    },
    update: () => {
      console.log("here");
    },
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  useEffect(() => {
    if (coords.length) {
      map.locate();
      map.flyTo({ lat: coords[0], lng: coords[1] }, map.getZoom());
    }
  }, [coords]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

let defaultPosition = [48.864719, 2.349]; // Paris position
let [position, setPosition] = ["", ""];

// function DisplayPosition({ map }) {
//   [position, setPosition] = useState(map.getCenter());
//   map
//     ? (defaultPosition = [
//         Number(map.getCenter().lat.toFixed(4)),
//         Number(map.getCenter().lng.toFixed(4)),
//       ])
//     : [48.864719, 2.349];
//   const onClick = useCallback(() => {
//     map.setView([48.864716, 2.349], 13);
//   }, [map]);
//   // console.log('markerPos', markerPos);
//   const onMove = useCallback(() => {
//     setPosition(map.getCenter());
//   }, [map]);

//   useEffect(() => {
//     map.on("move", onMove);
//     return () => {
//       map.off("move", onMove);
//     };
//   }, [map, onMove]);

//   return (
//     <p>
//       latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{" "}
//       <button onClick={onClick}>reset</button>
//     </p>
//   );
// }
