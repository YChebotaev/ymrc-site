import { useRouter } from "next/router";
import { usePlayer } from "../hooks";
import { PlayButton, MoveButton } from "../components";

export default function Player() {
  const router = useRouter();
  const { pincode } = router.query as { pincode?: string };
  const { playbackState, volume, play, pause, forward, backward, setVolume } = usePlayer(pincode);

  const playbackChangeHandler = async () => {
    if (playbackState === "paused") {
      await play();
    } else {
      await pause();
    }
  }; 

  const forwardHandler = async () => {
    await forward()
  }

  const backwardHandler = async () => {
    await backward()
  }

  return (
    <main
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "100vw",
        minHeight: "100vh",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <MoveButton state="backward" onClick={backwardHandler} />
          <PlayButton state={playbackState} onClick={playbackChangeHandler} />
          <MoveButton state="forward" onClick={forwardHandler} />
        </div>
      </div>
    </main>
  );
}
