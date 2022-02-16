import requestIp from "request-ip";

export default async function (req, res) {
  const { lang } = req.query;
  const respond = await fetch(
    `https://api.solastore.com.tr/api/Category/GetAll?lang=${lang}&sourceProof=${process.env.SOURCE_PROOF}`
  );
  const menuData = await respond.json();
  const fullMenu = [];

  await Promise.all(
    menuData.map(async (menu) => {
      const response = await fetch(
        `https://api.solastore.com.tr/api/Category/GetSubCategoryList?id=${menu.categoryID}&lang=${lang}&sourceProof=${process.env.SOURCE_PROOF}`
      );
      const subMenu = await response.json();

      fullMenu.push({
        ...menu,
        subcategories: subMenu,
      });
    })
  );

  await res.status(200).json(fullMenu);
}
