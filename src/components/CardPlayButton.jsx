import { useRef } from "react";
import { Play, Pause } from "./Player";
import { usePlayStore } from "@/store/playerStore";

function CardPlayButton({ id, playlist, song, songs, size="small" }) {
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
  const iconClassName = size === 'small' ? 'w-[18px] h-[18px]' : 'w-6 h-6'

  return (
    <button onClick={handleOnClick} className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400">
      {isPlayingPlaylist ? <Pause className={iconClassName} /> : <Play className={iconClassName} />}
    </button>
  )
}

export default CardPlayButton;
