export async function geocodeAddress(address, { country = "BR", language = "pt-BR" } = {}) {
  if (!address || typeof address !== "string") {
    throw new Error("Endereço inválido para geocodificação.");
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_MAPS_API_KEY não configurada no ambiente.");
  }

  const params = new URLSearchParams({
    address,
    key: apiKey,
    language,
    components: `country:${country}`,
  });

  const url = `https://maps.googleapis.com/maps/api/geocode/json?${params.toString()}`;
  const res = await fetch(url, { method: "GET" });

  if (!res.ok) {
    throw new Error(`Falha ao chamar Geocoding API: HTTP ${res.status}`);
  }

  const data = await res.json();

  if (data.status !== "OK" || !Array.isArray(data.results) || data.results.length === 0) {
    const reason = data.error_message || data.status || "ZERO_RESULTS";
    throw new Error(`Geocoding não retornou resultado: ${reason}`);
  }

  const best = data.results[0];
  const { lat, lng } = best.geometry?.location || {};
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    throw new Error("Resposta sem coordenadas válidas.");
  }

  return {
    lat,
    lng,
    formattedAddress: best.formatted_address,
    placeId: best.place_id,
    types: best.types,
    viewport: best.geometry?.viewport,
    raw: best,
  };
}