import { useState } from "react";

export const RangeSlider = () => {
  const [minValue, setMinValue] = useState(2000);
  const [maxValue, setMaxValue] = useState(8000);
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
