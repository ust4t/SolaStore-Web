import { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";

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

export default function WheelModal({ show, handleClose, wheelsData }) {
  const [prize, setPrize] = useState(null);
  const [resultHidden, setResultHidden] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [telNum, setTelNum] = useState("");
  const hasSpinned = loadState("hasSpinned", false);

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
      toast.error("Please enter a valid phone number", {
        position: "top-center",
      });
      return;
    }
    if (hasSpinned) {
      toast.error("You have already spun the wheel!", {
        position: "top-center",
      });
      return;
    }
    if (!telNum) {
      toast.error("Please enter your phone number", {
        position: "top-center",
      });
      return;
    }
    setResultHidden(true);
  };

  const handleWheelResult = async (itemIndex) => {
    if (prize && prize.discountRate === 0) {
      toast.error("Bad luck, try again!", {
        position: "top-center",
      });
      return;
    }
    if (telNum.length <= 5) {
      toast.error("Please enter a valid phone number", {
        position: "top-center",
      });
      return;
    }
    if (hasSpinned) {
      toast.error("You have already spun the wheel!", {
        position: "top-center",
      });
      return;
    }
    if (!telNum) return;
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/advertisement/generateCoupon", {
        params: {
          tel: telNum,
          giftId: wheelsData[itemIndex].giftVoucherID,
        },
      });
      setResultHidden(false);
      setPrize({ ...wheelsData[itemIndex], code: data.result2[0].voucherCode });
      saveState("hasSpinned", true);
      toast.success(
        "Ödül kodunuz başarıyla alındı. Kupon kodunuzu kopyalayıp kullanabilirsiniz.",
        {
          position: "top-center",
        }
      );
    } catch (e) {
      toast.error("An error occured", {
        position: "top-center",
      });
    } finally {
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

          <h3 className="text-center text-white">
            Click the wheel to earn your prize
          </h3>
          <Wheel
            items={wheelsData.map((item, index) => ({
              ...item,
              color: colors[index] || "#dc5d5d",
            }))}
            onWheelClick={handleWheelClick}
            onSelectItem={handleWheelResult}
            disabled={!telNum || hasSpinned || telNum.length <= 5}
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
                    <h3 className={result_text}>Bad luck, try again!</h3>
                  ) : (
                    <>
                      <h3 className={result_text}>
                        You won <br /> {prize?.voucherName}
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
                              toast.success("Copied to clipboard", {
                                position: "top-center",
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
            <h5 className="text-white fw-bold fs-4">Your Phone Number:</h5>
            <input
              onChange={(e) => setTelNum(e.target.value)}
              value={telNum}
              className={result_input}
              type="number"
              placeholder="Enter Your Phone Number"
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
