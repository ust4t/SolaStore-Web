import requestIp from "request-ip";

export default async function (req, res) {
  try {
    const clientIp = requestIp.getClientIp(req);
    const resLocation = await fetch(
      `https://api.solastore.com.tr/api/Helpers/CountryInfo?IP=${clientIp}&sourceProof=${process.env.SOURCE_PROOF}`
    );

    const locationData = await resLocation.json();

    await res.status(200).json(locationData);
  } catch (e) {
    await res.status(500).json(null);
  }
}
