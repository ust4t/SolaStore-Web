import useTranslation from "next-translate/useTranslation";
import { Fragment, useState } from "react";
import InputRange from "react-input-range";

const PriceFilter = ({ setActive_, filterByPrice }) => {
  const { t } = useTranslation("common");
  const [price, setPrice] = useState({ value: { min: 0, max: 130 } });

  return (
    <Fragment>
      <div className="shop-widget">
        <InputRange
          formatLabel={(value) => ``}
          maxValue={130}
          minValue={0}
          value={price.value}
          onChange={(value) => {
            setPrice({ value });
          }}
          onChangeComplete={(value) => {
            filterByPrice(value);
            if (setActive_) setActive_();
          }}
        />
        <span className="mt-10 d-block text-center fs-6">
          {t("price")} ${price.value.min} - ${price.value.max}
        </span>
      </div>
    </Fragment>
  );
};

export default PriceFilter;
