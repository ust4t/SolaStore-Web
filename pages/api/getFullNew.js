export default async function (req, res) {
  const { lang } = req.query;
  const respond = await fetch(
    `https://api.solastore.com.tr/api/Category/GetAll?lang=${lang}&sourceProof=${process.env.SOURCE_PROOF}`
  );
  const menuData = await respond.json();
  await res.status(200).json(menuData);
}
