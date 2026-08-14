import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

const ShareSolarMap = () => {
  const { t } = useTranslation();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const locations = [
    {
      id: "iraq",
      name: "Iraq",
      mw: 2,
      coords: [33.3152, 44.3661] as L.LatLngTuple,
    },
    {
      id: "uae",
      name: "UAE",
      mw: 5,
      coords: [24.4539, 54.3773] as L.LatLngTuple,
    },
    // {
    //   id: "vietnam",
    //   name: "Vietnam",
    //   mw: 2,
    //   coords: [14.0583, 108.2772] as L.LatLngTuple,
    // },
    // {
    //   id: "china",
    //   name: "China",
    //   mw: 4,
    //   coords: [35.8617, 104.1954] as L.LatLngTuple,
    // },
    {
      id: "south-africa",
      name: "South Africa",
      mw: 1,
      coords: [-30.5595, 22.9375] as L.LatLngTuple,
    },
  ];

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Initialize the map
      const initialZoom = window.innerWidth >= 768 ? 3 : 2;
      const map = L.map(mapRef.current, {
        center: [10, 60], // Centered to include Middle East, East Asia and Africa
        zoom: initialZoom,
        scrollWheelZoom: true,
        dragging: true,
        zoomControl: true,
        attributionControl: false,
      });

      // Use a premium Light Theme tile layer
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 19,
        },
      ).addTo(map);

      // Custom marker icon using DivIcon for full CSS control
      const createCustomIcon = (mw: number) =>
        L.divIcon({
          className: "custom-solar-marker",
          html: `
          <div class="relative flex flex-col items-center">
            <div class="w-3 h-3 bg-forcarooLightGreen rounded-full shadow-[0_0_10px_#00adae] animate-pulse"></div>
            <div class="absolute -top-10 bg-black backdrop-blur-md border border-slate-200 text-forcarooLightGreen font-semibold px-2 py-1 rounded whitespace-nowrap shadow-lg">
              ${mw} MW
            </div>
          </div>
        `,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

      // Add markers
      locations.forEach((loc) => {
        L.marker(loc.coords, { icon: createCustomIcon(loc.mw) })
          .addTo(map)
          .bindTooltip(loc.name, {
            permanent: false,
            direction: "bottom",
            className: "solar-map-tooltip",
          });
      });

      // Add connection lines (Polylines)
      const pathCoords = locations.map((loc) => loc.coords);
      L.polyline(pathCoords, {
        color: "#00adae",
        weight: 1,
        dashArray: "5, 10",
        opacity: 0.5,
        smoothFactor: 1,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="share-solar-map py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center items-start gap-4 md:gap-10 relative"
        >
          <span className="watermark">{t("shareSolarMap.name")}</span>
          <h4 className="py-1 px-6 bg-forcarooLightGreen text-slate-200 rounded-lg font-extrabold capitalize z-10">
            {t("shareSolarMap.title")}
          </h4>
          <h2 className="text-forcarooText text-2xl md:text-4xl font-extrabold capitalize">
            {t("shareSolarMap.heading")}
          </h2>
          <p className="text-forcarooTextLight">
            {t("shareSolarMap.description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative w-full h-[500px] md:h-[600px] max-w-7xl mt-8 mx-auto rounded-3xl overflow-hidden border border-slate-200 shadow-2xl z-0"
        >
          <div ref={mapRef} className="w-full h-full" />

          {/* Legend Overlay */}
          <div className="absolute bottom-0 lg:bottom-8 left-0 lg:left-8 bg-white/90 backdrop-blur-md border border-slate-200 p-4 rounded-xl z-[1000] shadow-xl">
            <div className="flex flex-col gap-1 lg:gap-3">
              <h5 className="text-[10px] text-forcarooLightGreen font-black uppercase tracking-[0.2em] mb-1">
                {t("shareSolarMap.legendTitle", "Our Global Presence")}
              </h5>
              <div className="grid grid-cols-2 lg:flex lg:flex-col gap-x-3 lg:gap-x-6 gap-y-1.5 lg:gap-y-3">
                {locations.map((loc) => (
                  <div key={loc.id} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-forcarooLightGreen rounded-full shadow-[0_0_5px_#00adae]" />
                    <span className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">
                      {loc.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .leaflet-container {
          background: #000 !important;
        }
        .solar-map-tooltip {
          background: #000 !important;
          border: 1px solid #00adae !important;
          color: #00adae !important;
          font-size: 10px !important;
          font-weight: bold !important;
          border-radius: 4px !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
        }
        .leaflet-tooltip-bottom:before {
          border-bottom-color: #00adae !important;
        }
      `,
        }}
      />
    </div>
  );
};

export default ShareSolarMap;
