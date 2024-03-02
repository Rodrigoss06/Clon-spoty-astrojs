import { useState, useEffect } from "react";
import { usePlayStore } from "@/store/playerStore";
export const Play = ({className,handleClick}) => (
  <svg role="img" className={className} onClick={handleClick} aria-hidden="true" viewBox="0 0 16 16">
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
);
export const Pause = ({className,handleClick}) => (
  <svg  className={className} onClick={handleClick}  role="img" aria-hidden="true" viewBox="0 0 16 16">
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
);
function CardPlayButton({ id, playlist, song, songs, size = "small" }) {
  const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } = usePlayStore((state) => state);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentMusic?.playlist) {
      setIsLoading(false);
    }
  }, [currentMusic]);





    const handleOnClick = () => {
      if ( currentMusic?.playlist?.id == id && isPlaying) {
        setIsPlaying(false);
        return;
      }
      if (song.albumId == currentMusic.song.albumId) {
        setIsPlaying(true);
        return;
      }
      setCurrentMusic({ playlist, song, songs });
      setIsPlaying(true)
  
    };

  const iconClassName = size === "small" ? "w-[18px] h-[18px]" : "w-6 h-6";
  const isMusic = currentMusic.song && currentMusic.song.albumId ==  id
  const playButton = isLoading ? (
    <div className="spinner">cargando ...</div> // Aquí podrías mostrar un spinner u otro indicador de carga
  ) : (
    <button
      className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400"
      onClick={handleOnClick}
    >
      { 
 isPlaying && isMusic
  ? (<Pause   className={`${iconClassName} `}/>)
  : (<Play  className={`${iconClassName} `}/>)}
    </button>
  );

  return playButton;
}

export default CardPlayButton;
