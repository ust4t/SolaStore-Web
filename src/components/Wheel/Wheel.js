import React from "react";

import {
  wheel_container,
  wheel,
  spinningWheel,
  wheel_overlay,
  wheel_overlay_title,
} from "./Wheel.module.css";

export default class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      cancelTouch: false,
    };
    this.selectItem = this.selectItem.bind(this);
  }

  getRandom() {
    let num = Math.random(),
      s = 0,
      lastIndex = this.props.items.length - 1;

    for (let i = 0; i < lastIndex; ++i) {
      s += this.props.items[i].coefficient / 100;
      if (num < s) {
        return this.props.items.indexOf(this.props.items[i]);
      }
    }

    return this.props.items.indexOf(this.props.items[lastIndex]);
  }

  selectItem() {
    this.setState({ cancelTouch: true });
    const audio = new Audio("/wheelSound.mp3");

    if (this.state.selectedItem === null) {
      const selectedItem = this.getRandom();
      if (this.props.onSelectItem) {
        setTimeout(() => {
          this.props.onSelectItem(selectedItem);
        }, 4250);
      }
      this.setState({ selectedItem });
    } else {
      this.setState({ selectedItem: null });
      setTimeout(this.selectItem, 500);
    }
    if (audio.paused) audio.play();
    setTimeout(() => {
      this.setState({
        cancelTouch: false,
      });
    }, 4250);
  }

  render() {
    const { selectedItem } = this.state;
    const { items } = this.props;

    const spinning = selectedItem !== null ? spinningWheel : "";
    const wheelVars = {
      "--nb-item": items.length,
      "--selected-item": selectedItem,
    };

    return (
      <div onClick={this.props.onWheelClick} className={wheel_container}>
        {this.props.overlay.show && (
          <span
            onClick={
              !this.props.disabled && !this.state.cancelTouch
                ? this.selectItem
                : null
            }>
            <div className={wheel_overlay} />
            <h1 className={wheel_overlay_title}>{this.props.overlay.title}</h1>
          </span>
        )}

        <div
          className={`${wheel} ${spinning}`}
          style={{
            ...wheelVars,
            pointerEvents: this.state.cancelTouch ? "none" : "auto",
            cursor: this.state.cancelTouch ? "default" : "pointer",
          }}
          onClick={
            !this.props.disabled && !this.state.cancelTouch
              ? this.selectItem
              : null
          }>
          {items.map((item, index) => (
            <div
              className={`${item.voucherName.replace(
                /[ %0-9]/gi,
                ""
              )}${index} wheel_item`}
              key={index}
              style={{
                "--item-nb": index,
              }}>
              <style jsx>
                {`
                  .${item.voucherName.replace(
                      /[ %0-9]/gi,
                      ""
                    )}${index}.wheel_item:before {
                    border-right: solid ${item.color}
                      calc(var(--wheel-size) / 2);
                  }
                `}
              </style>

              <h4>{item.voucherName}</h4>
            </div>
          ))}
          <img src="/images/placeholder.jpg" alt="" />
        </div>
      </div>
    );
  }
}
