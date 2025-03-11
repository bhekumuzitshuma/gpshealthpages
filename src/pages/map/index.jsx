import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getCowIcon } from "@/components/LeafletClient";
import "leaflet/dist/leaflet.css";
import MainLayout from "@/layouts/MainLayout";

// Dynamically import react-leaflet components
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const MapPage = () => {
  const [cowIcon, setCowIcon] = useState(null);

  useEffect(() => {
    getCowIcon().then((icon) => {
      if (icon) setCowIcon(icon);
    });
  }, []);

  const cowPositions = [
    [-20.438086060834433, 29.26955125565082], // Cow 1
    [-20.439, 29.268], // Cow 2 (Example nearby positions)
    [-20.437, 29.27], // Cow 3
    [-20.438, 29.271], // Cow 4
    [-20.436, 29.269], // Cow 5
  ];

  const centerPosition = [-20.438086060834433, 29.26955125565082]; // New center coordinates

  return (
    <MainLayout>
      <div>
        <h2>Scenarios</h2>
        <button>Wildlife attack</button>
      </div>
      <div style={{ height: "100vh", width: "100%" }}>
        <MapContainer
          center={centerPosition}
          zoom={17}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Render markers only when cowIcon is available */}
          {cowIcon &&
            cowPositions.map((position, index) => (
              <Marker key={index} position={position} icon={cowIcon}>
                <Popup>
                  Cow {index + 1} <br /> Location: {position[0]}, {position[1]}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </MainLayout>
  );
};

export default MapPage;
