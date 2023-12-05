import { useEffect, useRef, useState } from "react";

interface InputRangeProps {
  minValues: number;
  maxValues: number;
  onChange: ({ min, max }: { min: number; max: number }) => void;
}

export const InputRange: React.FC<InputRangeProps> = ({
  minValues,
  maxValues,
  onChange,
}) => {
  const [minValue, setMinValue] = useState(minValues);
  const [maxValue, setMaxValue] = useState(maxValues);
  const minInputRef = useRef<HTMLInputElement | null>(null);
  const maxInputRef = useRef<HTMLInputElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const left = minInputRef.current
    ? (minValues / parseInt(minInputRef.current.max)) * 100 + "%"
    : "0%";

  const right = maxInputRef.current
    ? 100 - (maxValues / parseInt(maxInputRef.current.max)) * 100 + "%"
    : "0%";
  useEffect(() => {
    onChange({ min: minValue, max: maxValue });
  }, [minValue, maxValue]);

  useEffect(() => {
    if (minInputRef.current && maxInputRef.current && progressRef.current) {
      const rangeInput = [minInputRef.current, maxInputRef.current];
      const progress = progressRef.current;
      let priceGap = 1000;
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
            console.log(minVal, minValues);
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
            left: left,
            right: right,
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
          max="10000"
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
          max="10000"
          value={maxValue}
          onChange={(e) => setMaxValue(Number(e.target.value))}
        />
      </div>
    </>
  );
};
