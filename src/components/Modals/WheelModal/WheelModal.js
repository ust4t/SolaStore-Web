import { memo, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import useTranslation from "next-translate/useTranslation";
import Router from "next/router";

import Loader from "../../Loader";
import { saveState, loadState } from "../../../redux/browser-storage";
import Wheel from "../../Wheel";
import {
  modalBg,
  close_icon,
  hide_result,
  show_result,
  result_text,
  result_input,
  result_container,
  result_code,
  copy_button,
} from "./WheelModal.module.css";

function WheelModal({ show, handleClose, wheelsData }) {
  const { t } = useTranslation("home");
  const [prize, setPrize] = useState(null);
  const [spinOverlay, setSpinOverlay] = useState(true);
  const [resultHidden, setResultHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [telNum, setTelNum] = useState("");
  const spinStatus = loadState("spinStatus", {
    hasSpinned: false,
    expires: new Date().getTime() + 60 * 60 * 24 * 1000,
  });

  const colors = [
    "#eae56f",
    "#428600",
    "#9c2ba1",
    "#a9b400",
    "#ffca01",
    "#f89400",
  ];

  const handleCopyText = (e) => {
    const text = e.target.value;
    e.target.select();
    e.target.setSelectionRange(0, 99999);
    if (window.isSecureContext) {
      navigator.clipboard.writeText(text);
    }
  };

  const handleWheelClick = () => {
    if (telNum.length <= 5) {
      toast.error(t("wheel.telValid"), {
        position: "top-center",
      });
      return;
    }
    if (spinStatus.hasSpinned) {
      toast.error(t("wheel.wheelSpun"), {
        position: "top-center",
      });
      return;
    }
    if (!telNum) {
      toast.error(t("wheel.phonePlaceholder"), {
        position: "top-center",
      });
      return;
    }
    setSpinOverlay(false);
    setResultHidden(true);
  };

  const handleWheelResult = async (itemIndex) => {
    try {
      Router.push(
        {
          pathname: Router.pathname,
          query: {
            ...Router.query,
            spinned: true,
          },
        },
        undefined,
        { shallow: true }
      );
      if (wheelsData[itemIndex].discountRate === 0) {
        setPrize({
          discountRate: 0,
        });
        setResultHidden(false);
        toast.error(t("wheel.tryAgain"), {
          position: "top-center",
        });
        return false;
      }
      if (telNum.length <= 5) {
        toast.error(t("wheel.telValid"), {
          position: "top-center",
        });
        return;
      }
      if (spinStatus.hasSpinned) {
        toast.error(t("wheel.wheelSpun"), {
          position: "top-center",
        });
        return;
      }
      if (!telNum) return;
      setIsLoading(true);
      const { data } = await axios.get("/api/advertisement/generateCoupon", {
        params: {
          tel: telNum,
          giftId: wheelsData[itemIndex].giftVoucherID,
        },
      });
      setResultHidden(false);
      setPrize({
        ...wheelsData[itemIndex],
        code: data.result2[0].voucherCode,
      });
      saveState("spinStatus", {
        hasSpinned: true,
        expires: Date.parse(data.result2[0].deletingDate),
      });
      toast.success(t("wheel.wheelWon"), {
        position: "top-center",
      });
    } catch (e) {
      toast.error("An error occured", {
        position: "top-center",
      });
    } finally {
      setSpinOverlay(false);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      contentClassName={modalBg}
      show={show}
      onHide={handleClose}
      aria-labelledby="share-modal-title">
      <Modal.Body className="px-0">
        <div className="position-relative">
          <i
            style={{
              zIndex: "1",
            }}
            className={`fa fa-times position-absolute cursor-pointer ${close_icon}`}
            onClick={handleClose}
          />
          <Wheel
            overlay={{
              show: spinOverlay,
              title:
                telNum.length > 5
                  ? t("wheel.wheelSpin")
                  : t("wheel.wheelClickTitle"),
            }}
            items={wheelsData.map((item, index) => ({
              ...item,
              color: colors[index] || "#dc5d5d",
            }))}
            onWheelClick={handleWheelClick}
            onSelectItem={handleWheelResult}
            disabled={!telNum || spinStatus.hasSpinned || telNum.length <= 5}
          />
          <div
            className={`${result_container} d-flex flex-column align-items-center justify-content-center`}>
            <div
              className={`d-flex flex-column align-items-center ${
                prize && !resultHidden ? show_result : hide_result
              }`}>
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {prize?.discountRate === 0 ? (
                    <h3 className={result_text}>{t("wheel.tryAgain")}</h3>
                  ) : (
                    <>
                      <h3 className={result_text}>
                        {t("wheel.wonTitle")} <br /> {prize?.voucherName}
                      </h3>
                      <span>
                        <input
                          readOnly
                          onClick={handleCopyText}
                          value={prize?.code}
                          className={result_code}
                        />

                        <button
                          onClick={() => {
                            if (window.isSecureContext) {
                              navigator.clipboard.writeText(prize?.code);
                              toast.success(t("common:copy"), {
                                position: "top-center",
                                duration: 1500,
                              });
                            }
                          }}
                          className={copy_button}>
                          <i className="fas fa-copy" /> Copy
                        </button>
                      </span>
                    </>
                  )}
                </>
              )}
            </div>
            <h5 className="text-white fw-bold fs-4">{t("wheel.phone")}:</h5>
            <input
              onChange={(e) => setTelNum(e.target.value.replace(/\D/g, ""))}
              value={telNum.replace(/\D/g, "")}
              className={result_input}
              type="text"
              placeholder={t("wheel.phonePlaceholder")}
            />
            {prize && !resultHidden && (
              <p className="text-white fs-5 text-center">
                {t("wheel.wheelInfo")}
              </p>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default memo(WheelModal);
