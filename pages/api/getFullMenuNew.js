export default async function (req, res) {
  const { lang } = req.query;
  try {
    const respond = await fetch(
      `https://api.solastore.com.tr/api/Category/GetAllNew?lang=${lang}&sourceProof=${process.env.SOURCE_PROOF}`
    );
    const menuData = await respond.json();
    await res.status(200).json(menuData);
  } catch (error) {
    await res.status(500).json({ message: error.message });
  }
}
