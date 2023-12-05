"use client";
import { useEffect, useRef, useState } from "react";

export const ExpRange = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);

  const minInputRef = useRef<HTMLInputElement | null>(null);
  const maxInputRef = useRef<HTMLInputElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (minInputRef.current && maxInputRef.current && progressRef.current) {
      const rangeInput = [minInputRef.current, maxInputRef.current];
      const progress = progressRef.current;
      let priceGap = 10;
      rangeInput.forEach((input) => {
        input.addEventListener("input", (e) => {
          let minVal = parseInt(rangeInput[0].value);
          let maxVal = parseInt(rangeInput[1].value);
          if (maxVal - minVal < priceGap) {
            if (e.target instanceof HTMLInputElement) {
              if (e.target.className === "range-min") {
                rangeInput[0].value = String(maxVal - priceGap);
              } else {
                rangeInput[1].value = String(minVal + priceGap);
              }
            }
          } else {
            progress.style.left =
              (minVal / parseInt(rangeInput[0].max)) * 100 + "%";
            progress.style.right =
              100 - (maxVal / parseInt(rangeInput[1].max)) * 100 + "%";
          }
        });
      });
    }
  }, [maxValue, minValue]);
  return (
    <>
      <div
        style={{
          height: "5px",
          borderRadius: "5px",
          background: "#ddd",
          position: "relative",
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: "5px",
            left: "0%",
            right: "0%",
            position: "absolute",
            borderRadius: "5px",
            background: "#17A2BB",
          }}
        ></div>
      </div>
      <div style={{ position: "relative" }}>
        <input
          style={{
            position: "absolute",
            top: "-5px",
            height: "5px",
            width: "100%",
            background: "none",
            pointerEvents: "none",
            WebkitAppearance: "none",
          }}
          ref={minInputRef}
          type="range"
          className="range-min"
          min="0"
          max="100"
          value={minValue}
          onChange={(e) => setMinValue(Number(e.target.value))}
        />
        <input
          style={{
            position: "absolute",
            top: "-5px",
            height: "5px",
            width: "100%",
            background: "none",
            pointerEvents: "none",
            WebkitAppearance: "none",
          }}
          ref={maxInputRef}
          type="range"
          className="range-max"
          min="0"
          max="100"
          value={maxValue}
          onChange={(e) => setMaxValue(Number(e.target.value))}
        />
      </div>
    </>
  );
};
