const Paggination = ({ setActive, active, length, sort }) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="basic-pagination basic-pagination-2 text-center">
          {length ? (
            <ul>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    setActive(0);
                    e.preventDefault();
                  }}
                >
                  <i className="fas fa-angle-double-left" />
                </a>
              </li>

              {Array(Math.ceil(length / sort))
                .fill("p")
                .map((m, i) => (
                  <li key={i} className={`${active === i ? "active" : ""}`}>
                    <a
                      href="#"
                      onClick={(e) => {
                        setActive(i);
                        e.preventDefault();
                      }}
                    >
                      {i < 9 ? `0${i + 1}` : i + 1}
                    </a>
                  </li>
                ))}

              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    setActive(Array(Math.ceil(length / sort)).length - 1);
                    e.preventDefault();
                  }}
                >
                  <i className="fas fa-angle-double-right" />
                </a>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Paggination;
