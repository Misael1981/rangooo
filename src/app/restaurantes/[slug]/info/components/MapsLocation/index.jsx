"use client";

import { useMemo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "12px",
  overflow: "hidden",
};

function MapsLocation({ lat, lng, address, zoom = 15 }) {
  const hasCoords = Number.isFinite(lat) && Number.isFinite(lng);
  const destination = hasCoords ? `${lat},${lng}` : address || "";

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const center = useMemo(
    () => (hasCoords ? { lat, lng } : undefined),
    [hasCoords, lat, lng],
  );

  // Fallback: sem API key ou sem coordenadas, usa iframe embed
  if (!isLoaded || !hasCoords) {
    const q = encodeURIComponent(destination || "");
    const src = hasCoords
      ? `https://www.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&output=embed`
      : `https://www.google.com/maps?q=${q}&output=embed`;

    return (
      <div style={containerStyle}>
        <iframe
          title="Mapa"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={src}
        />
        <div className="mt-2">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            Abrir no Google Maps
          </a>
        </div>
      </div>
    );
  }

  // Mapa interativo com SDK
  return (
    <div style={containerStyle}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        options={{ disableDefaultUI: false }}
      >
        <Marker position={center} />
      </GoogleMap>
      <div className="mt-2">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          Abrir no Google Maps
        </a>
      </div>
    </div>
  );
}

export default MapsLocation;
