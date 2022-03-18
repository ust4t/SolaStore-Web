import axios from "axios";

export default async function (req, res) {
  try {
    const { searchQuery, lang } = req.query;

    const { data } = await axios.get(
      `https://api.solastore.com.tr/api/Helpers/AdvancedSearchTextSearch?text=${searchQuery}&lang=${lang}&sourceProof=${process.env.SOURCE_PROOF}`
    );

    await res.status(200).json(
      data
        .map((item) => ({
          masterId: item.masterProductID,
          id: item.productID,
          pic: item.picture_1,
          name: item.productShortName,
        }))
        .slice(0, 7)
    );
  } catch (error) {
    await res.status(500).json(error);
  }
}
