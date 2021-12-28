const Reating = ({ rating }) => {
  return (
    <ul className="pro-rating d-flex mb-2">
      <li className="mr-1">
        <i className={`${rating >= 1 ? "fas fa-star" : "far fa-star"}`} />{" "}
      </li>
      <li className="mr-1">
        <i className={`${rating >= 2 ? "fas fa-star" : "far fa-star"}`} />{" "}
      </li>
      <li className="mr-1">
        <i className={`${rating >= 3 ? "fas fa-star" : "far fa-star"}`} />{" "}
      </li>
      <li className="mr-1">
        <i className={`${rating >= 4 ? "fas fa-star" : "far fa-star"}`} />{" "}
      </li>
      <li className="mr-1">
        <i className={`${rating >= 5 ? "fas fa-star" : "far fa-star"}`} />{" "}
      </li>
    </ul>
  );
};

export default Reating;
