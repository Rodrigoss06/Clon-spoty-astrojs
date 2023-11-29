import { useRef } from "react";
import { Play, Pause } from "./Player";
import { usePlayStore } from "@/store/playerStore";

function CardPlayButton({ id, playlist, song, songs }) {
  const {
    isPlaying,
    setIsPlaying,
    currentMusic,
    setCurrentMusic,
  } = usePlayStore((state) => state);

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist?.id == id;

  const handleOnClick = () => {

    if(isPlayingPlaylist){
      setIsPlaying(false)
      return
    }
    setIsPlaying(true);

    setCurrentMusic({ playlist, song, songs });

  };

  return (
    <button onClick={handleOnClick} className="p-3 rounded-full bg-green-500 ">
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  );
}

export default CardPlayButton;
