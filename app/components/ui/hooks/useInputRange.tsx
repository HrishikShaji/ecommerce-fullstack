import { useEffect, useRef, useState } from "react";

interface UseInputRangeProps {
  minValue: number;
  maxValue: number;
}

export const useInputRange = ({ minValue, maxValue }: UseInputRangeProps) => {
  const minInputRef = useRef<HTMLInputElement | null>(null);
  const maxInputRef = useRef<HTMLInputElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log(minValue, maxValue);
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
  return {
    minInputRef,
    maxInputRef,
    progressRef,
    minValue,
    maxValue,
  };
};
