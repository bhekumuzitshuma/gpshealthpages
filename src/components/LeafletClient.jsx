export const getCowIcon = async () => {
  if (typeof window === "undefined") return null; // Prevent SSR issues

  const L = await import("leaflet"); // Import leaflet dynamically on the client

  return new L.Icon({
    iconUrl: "/cow.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};
