import { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import { MapContainer, Popup, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import { useRouter } from "next/router";

const Map = () => {
  const [coords, setCoords] = useState([]);
  const { query } = useRouter();
  useEffect(() => {
    if (!query.lat && !query.lng) return;
    setCoords((current) => [parseFloat(query.lat), parseFloat(query.lng)]);
  }, [query]);

  if (!coords.length) return null;
  return (
    <>
      <MapContainer
        className={styles.map_container}
        center={[coords[0], coords[1]]}
        zoom={15}
        scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker coords={coords} />
      </MapContainer>
    </>
  );
};

export default Map;

function LocationMarker({ coords }) {
  const map = useMap();
  // useEffect(() => {
  //   map.panTo({ lat: coords[0], lng: coords[1] });
  // }, []);

  const polyline = [
    [coords[0], coords[1]],
    [(52, 530007), coords[1]],
  ];
  const limeOptions = { color: "lime" };
  return !coords.length ? null : (
    <Marker position={coords}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

// function Control({ coords }) {
//   const [start, setStart] = useState([38.9072, -77.0369]);
//   const [end, setEnd] = useState([37.7749, -122.4194]);
//   useEffect(() => {
//     console.log(coords);
//   }, [coords]);

//   const maps = {
//     base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//   };
//   return (
//     <>
//       {coords.length && (
//         <>
//           {" "}
//           <RoutingControl
//             position={"topleft"}
//             start={coords}
//             end={[(52, 580007), coords[1]]}
//             color={"#757de8"}
//           />
//           <LayersControl position="topright">
//             <LayersControl.BaseLayer checked name="Map">
//               <TileLayer
//                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                 url={maps.base}
//               />
//             </LayersControl.BaseLayer>
//           </LayersControl>
//         </>
//       )}
//     </>
//   );
// }
