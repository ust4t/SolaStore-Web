import React from "react";
import { subTitle } from "./EnterNumberLayout.module.css";

export default function EnterNumberLayout() {
  return (
    <div className="row p-5 mx-5">
      <div
        style={{
          backgroundColor: "var(--color-primary)",
        }}
        className="col-6 p-5 d-flex flex-column justify-content-center align-items-center">
        <h3 className="text-white fw-bold">НО ВАШ НОМЕР. МЫ ЖДЕМ ВАС!</h3>
        <div className={subTitle}>
          <h5 className="text-white">ВЫ ХОТИТЕ ВИДЕТЬ СЕБЯ?</h5>
        </div>
      </div>
      <div className="col-6">
        <h1>Info</h1>
      </div>
    </div>
  );
}
