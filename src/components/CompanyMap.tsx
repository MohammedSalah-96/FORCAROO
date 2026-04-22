import { useEffect } from "react";
import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";

const CompanyMap = () => {
  useEffect(() => {
    const coordinates: LatLngTuple = [36.18890025033145, 44.00283748988509];
    const zoomLevel = 5.5;

    const map = L.map("map", {
      center: coordinates,
      zoom: zoomLevel,
      dragging: true,
      scrollWheelZoom: true,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: " © OpenStreetMap contributors",
    }).addTo(map);

    // Define the custom red marker icon
    const redIcon = new L.Icon({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      shadowSize: [41, 41],
      shadowAnchor: [12, 41],
      className: "red-marker",
    });

    L.marker(coordinates, { icon: redIcon })
      .addTo(map)
      .bindPopup("forcaroo COMPANY")
      .openPopup();

    map.invalidateSize();

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      id="map"
      style={{ height: "500px", width: "100%" }}
      className="after:h-full after:w-full after:top-0 after:left-0 flex after:z-50"
    />
  );
};

export default CompanyMap;
