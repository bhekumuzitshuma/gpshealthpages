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

const generateRandomPositions = (center, count, range = 0.002) => {
  return Array.from({ length: count }, () => [
    center[0] + (Math.random() - 0.5) * range,
    center[1] + (Math.random() - 0.5) * range,
  ]);
};

const MapPage = () => {
  const [cowIcon, setCowIcon] = useState(null);
  const [cowPositions, setCowPositions] = useState([]);
  const [cowHealth, setCowHealth] = useState([]);
  const [blinkingMarkers, setBlinkingMarkers] = useState([]); // Track blinking markers

  useEffect(() => {
    getCowIcon().then((icon) => {
      if (icon) setCowIcon(icon);
    });

    // Initialize 25 cows in a grazing area
    const initialPositions = generateRandomPositions([-20.438, 29.269], 25);
    setCowPositions(initialPositions);
    setCowHealth(Array(25).fill({ pulse: 72 })); // Default pulse rate for cows
  }, []);

  // Simulate cow movement every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCowPositions((prev) =>
        prev.map((pos, i) => {
          // If the cow's pulse is 0, keep it stationary
          if (cowHealth[i]?.pulse === 0) return pos;
          // Otherwise, move the cow randomly
          return [
            pos[0] + (Math.random() - 0.5) * 0.0001,
            pos[1] + (Math.random() - 0.5) * 0.0001,
          ];
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [cowHealth]);

  // Handle blinking effect for markers
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkingMarkers((prev) =>
        prev.map((blink) => ({ ...blink, visible: !blink.visible }))
      );
    }, 500); // Blink every 500ms

    return () => clearInterval(blinkInterval);
  }, []);

  const simulateScenario = (scenario) => {
    switch (scenario) {
      case "wildlife_attack":
        setCowPositions((prev) =>
          prev.map((pos, i) =>
            i === 0 ? [pos[0] + 0.001, pos[1] - 0.001] : pos
          )
        );
        setCowHealth((prev) =>
          prev.map((health, i) => (i === 0 ? { pulse: 120 } : health))
        ); // Increase pulse for attacked cow
        break;

      case "road_accident":
        setCowHealth((prev) =>
          prev.map((health, i) => {
            if (i === 1) {
              alert(`Alert! Cow ${i + 1}'s pulse dropped to zero.`);
              setBlinkingMarkers((prevBlink) => [
                ...prevBlink,
                { id: i, visible: true },
              ]); // Add to blinking markers
              return { pulse: 0 };
            }
            return health;
          })
        );
        break;

      case "theft":
        setCowPositions((prev) =>
          prev.map((pos, i) => (i < 5 ? [pos[0] + 0.005, pos[1] + 0.005] : pos))
        );
        break;

      case "illness":
        setCowHealth((prev) =>
          prev.map((health, i) =>
            i === prev.length - 1 // Last cow is sick
              ? { pulse: 50, temperature: 41, respiration: 35, status: "ill" }
              : health
          )
        );

        setCowPositions((prevPositions) =>
          prevPositions.map((pos, i) => {
            if (!Array.isArray(pos) || pos.length !== 2) {
              console.error("Invalid position detected:", pos);
              return pos;
            }

            const [lat, lng] = pos;

            // Make the last cow move significantly slower
            const latChange =
              i === prevPositions.length - 1 ? 0.000005 : 0.0001;
            const lngChange =
              i === prevPositions.length - 1 ? 0.000005 : 0.0001;

            return [lat + latChange, lng + lngChange];
          })
        );

        // Make the last cow's marker blink
        setBlinkingMarkers((prevBlink) => [
          ...prevBlink.filter((blink) => blink.id !== cowPositions.length - 1), // Remove previous entry if exists
          { id: cowPositions.length - 1, visible: true, type: "ill" }, // Add sick cow to blinking list
        ]);
        break;

      case "stampede":
        setCowPositions((prevPositions) =>
          prevPositions.map((pos) => {
            if (!Array.isArray(pos) || pos.length !== 2) {
              console.error("Invalid position detected:", pos);
              return pos; // Skip invalid positions
            }

            const [lat, lng] = pos; // ✅ Correctly extract lat and lng from array
            const latChange = 0.0005; // Faster movement
            const lngChange = 0.0005;

            return [lat + latChange, lng + lngChange]; // ✅ Return as an array, not an object
          })
        );
        setCowHealth((prev) => prev.map(() => ({ pulse: 100 }))); // Increase pulse for all cows
        break;

      default:
        console.log("Scenario not implemented");
    }
  };

  return (
    <MainLayout>
      <div>
        <h2>Scenarios</h2>
        <button
          className="btn-soft btn btn-primary mr-1"
          onClick={() => simulateScenario("wildlife_attack")}
        >
          Wildlife Attack
        </button>
        <button
          className="btn-soft btn btn-primary mr-1"
          onClick={() => simulateScenario("road_accident")}
        >
          Road Accident
        </button>
        <button
          className="btn-soft btn btn-primary mr-1"
          onClick={() => simulateScenario("theft")}
        >
          Cattle Theft
        </button>
        <button
          className="btn-soft btn btn-primary mr-1"
          onClick={() => simulateScenario("illness")}
        >
          Illness Detected
        </button>
        <button
          className="btn btn-primary btn-soft"
          onClick={() => simulateScenario("stampede")}
        >
          Stampede
        </button>
      </div>
      <div className="mt-3" style={{ height: "90vh", width: "100%" }}>
        <MapContainer
          center={[-20.438, 29.269]}
          zoom={17}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {cowIcon &&
            cowPositions.map((position, index) => {
              const isBlinking = blinkingMarkers.some(
                (marker) => marker.id === index && marker.visible
              );
              return (
                <Marker
                  key={index}
                  position={position}
                  icon={cowIcon}
                  opacity={isBlinking ? 0.5 : 1} // Blink effect
                >
                  <Popup>
                    Cow {index + 1} <br /> Location: {position[0]},{" "}
                    {position[1]} <br /> Pulse:{" "}
                    {cowHealth[index]?.pulse ?? "N/A"}
                  </Popup>
                </Marker>
              );
            })}
        </MapContainer>
      </div>
    </MainLayout>
  );
};

export default MapPage;
