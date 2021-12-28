import React from "react";

export default function sliderColors({ arr }) {
  const [data, setdata] = useState();
  setdata(arr);

  return data.map(({ picture_1, pictures }, i) => (
    <Image
      key={`${i}__`}
      className="color-select"
      width={45}
      height={45}
      src={`https://solastore.com.tr/img/ProductWM/maxPic/${
        picture_1 || images[0].guidName
      }`}
      loading="eager"
      onClick={() => {
        if (pictures) {
          changeDressColor(pictures);
        } else {
          changeDressColor(images);
        }
      }}
    />
  ));
}
