"use client";
import { useEffect, useState } from "react";

export const RangeSlider = () => {
  const [minValue, setMinValue] = useState(2000);
  const [maxValue, setMaxValue] = useState(8000);

  useEffect(() => {
    const rangeInput = document.querySelectorAll(".range-input input");
    const progress = document.querySelector(".slider .progress");
    let priceGap = 1000;
    rangeInput.forEach((input) => {
      input.addEventListener("input", (e) => {
        let minVal = parseInt(rangeInput[0].value);
        let maxVal = parseInt(rangeInput[1].value);

        if (maxVal - minVal < priceGap) {
          if (e.target.className === "range-min") {
            rangeInput[0].value = maxVal - priceGap;
          } else {
            rangeInput[1].value = minVal + priceGap;
          }
        } else {
          progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
          progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }

        let percent = (minVal / rangeInput[0].max) * 100;
        console.log(percent);
      });
    });
  }, [maxValue, minValue]);
  return (
    <>
      <div className="slider">
        <div className="progress"></div>
      </div>
      <div className="range-input">
        <input
          type="range"
          className="range-min"
          min="0"
          max="10000"
          value={minValue}
          onChange={(e) => setMinValue(Number(e.target.value))}
        />
        <input
          type="range"
          className="range-max"
          min="0"
          max="10000"
          value={maxValue}
          onChange={(e) => setMaxValue(Number(e.target.value))}
        />
      </div>
    </>
  );
};
