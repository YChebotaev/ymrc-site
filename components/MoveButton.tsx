import type { FC } from "react";
import { BackwardIcon, ForwardIcon } from "./icons";

const getIcon = (state?: "backward" | "forward" | null) => {
  switch (state) {
    case "backward":
      return <BackwardIcon />;
    case "forward":
      return <ForwardIcon />;
    default:
      return null;
  }
};

export const MoveButton: FC<{
  state?: "backward" | "forward";
  onClick?(): void;
}> = ({ state = null, onClick }) => {
  const icon = getIcon(state);

  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
      }}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};
