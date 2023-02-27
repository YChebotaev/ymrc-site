import type { ChangeEvent, FC, SyntheticEvent, CSSProperties } from "react";
import { useMemo, createRef } from "react";

export const PincodeInput: FC<{
  value: string[];
  length: number;
  style?: CSSProperties;
  inputStyle?: CSSProperties;
  onChange(value: string[]): void;
  onComplete?(value: string[]): void;
}> = ({ value, length, style, inputStyle, onChange, onComplete }) => {
  const refs = useMemo(() => {
    return new Array(length)
      .fill(null)
      .map(() => createRef<HTMLInputElement>());
  }, [length]);
  const inputs = new Array(length).fill(null).map((_, index) => {
    const inputValue = value[index] ?? "";
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = String(e.target.value).trim();
      const char = inputValue[inputValue.length - 1];
      const nextValue = new Array(length)
        .fill(null)
        .map((_, i) => (i === index ? char : value[i]));

      onChange(nextValue);

      const nextRef = refs[index + 1];

      if (nextRef) {
        nextRef.current!.select();
      } else {
        for (const char of nextValue) {
          if (char == null) return;
        }

        if (typeof onComplete === "function") {
          onComplete(nextValue);
        }
      }
    };
    const selectHandler = (e: SyntheticEvent<HTMLInputElement>) => {
      // @ts-expect-error TS2339
      e.target.select();
    };

    return (
      <input
        ref={refs[index]}
        key={index}
        type="text"
        value={inputValue}
        style={inputStyle}
        onChange={changeHandler}
        onSelect={selectHandler}
      />
    );
  });

  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        ...style,
      }}
    >
      {inputs}
    </div>
  );
};
