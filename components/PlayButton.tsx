import type { FC } from "react";
import { PlayIcon, PauseIcon } from "./icons";

const getIcon = (state?: "playing" | "paused" | null) => {
  switch (state) {
    case "playing":
      return <PauseIcon />;
    case "paused":
      return <PlayIcon />;
    default:
      return null;
  }
};

export const PlayButton: FC<{
  state?: "playing" | "paused";
  onClick?(): void;
}> = ({ state = null, onClick }) => {
  const icon = getIcon(state);

  return <button style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40
  }} onClick={onClick}>{icon}</button>;
};
