import React from "react";

export default function Success() {
  return (
    <div className="row">
      <div className="col-12">
        <i
          style={{
            fontSize: "6rem",
          }}
          className="fas fa-exclamation text-center w-100 text-danger"
        />
        <h1 className="text-center fs-1">Payment Successful</h1>
      </div>
    </div>
  );
}
