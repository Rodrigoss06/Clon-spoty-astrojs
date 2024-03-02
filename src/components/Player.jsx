import { useRef, useEffect, useState } from "react";
import { usePlayStore } from "@/store/playerStore";
import { Slider } from "./Slider";
// import Queue from "@/icons/Queue.astro";
const Queue = () => (
  <svg
    data-encore-id="icon"
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
    height={16}
    width={16}
    fill="white"
  >
    <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z"></path>
  </svg>
);
const CurrentSong = ({ image, title, artists }) => {
  return (
    <div className="flex items-center gap-5 relative overflow-hidden xl:w-[350px]  lg:w-60 md:w-52 sm:w-48 h-auto">
      <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img src={image} alt={title} />
      </picture>
      <div className="flex flex-col">
        <span className="font-semibold text-sm block">{title}</span>
        <span className="text-sm block">{artists}</span>
      </div>
    </div>
  );
};
export const Play = ({ className }) => (
  <svg
    role="img"
    className={className}
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
);
export const Pause = ({ className }) => (
  <svg
    height="16"
    className={className}
    width="16"
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
);
export const VolumeMute = () => (
  <svg
    fill="currentColor"
    height="16"
    width="16"
    role="presentation"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path>
    <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
  </svg>
);
export const Volume = () => (
  <svg
    fill="currentColor"
    height="16"
    width="16"
    role="presentation"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
    <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
  </svg>
);
const ProgressAudio = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const formatTime = (time) => {
    if (time == null) return "00:00";
    const segundos = Math.floor(time % 60);
    const minutos = Math.floor(time / 60);
    return `${minutos}:${segundos.toLocaleString().padStart("2", 0)}`;
  };
  const handleTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime);
  };
  const duration = audio?.current?.duration ?? null;
  useEffect(() => {
    audio.current.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="flex gap-x-3 ">
      <span className="opacity-50">{formatTime(currentTime)}</span>
      <Slider
        defaultValue={[0]}
        min={0}
        max={audio?.current?.duration ?? 0}
        className="xl:w-[600px] lg:w-96 md:w-72 sm:w-60 w-52"
        value={[currentTime]}
        onValueChange={(value) => {
          const [newTime] = value;
          audio.current.currentTime = newTime;
        }}
      />
      <span className="opacity-50">{formatTime(duration)}</span>
    </div>
  );
};
const VolumenControl = () => {
  const volume = usePlayStore((state) => state.volume);
  const setVolume = usePlayStore((state) => state.setVolume);
  const previusVolume = useRef(0);
  useEffect(() => {
    const initialVolume = JSON.parse(localStorage.getItem("volume"));
    setVolume(initialVolume);
  }, []);

  const handleClickVolume = () => {
    if (volume == 0) {
      setVolume(previusVolume.current);
    } else {
      previusVolume.current = volume;
      setVolume(0);
    }
  };

  return (
    <div className="flex justify-center gap-x-2 text-white">
      <button onClick={handleClickVolume}>
        {volume == 0 ? <VolumeMute /> : <Volume />}
      </button>
      <Slider
        defaultValue={[100]}
        min={0}
        max={100}
        className="lg:w-24 md:w-20 sm:w-16"
        value={[volume * 100]}
        onValueChange={(value) => {
          const [newVolumen] = value;
          const volumenValue = newVolumen / 100;
          setVolume(volumenValue);
        }}
      />
    </div>
  );
};
function Player() {
  const { isPlaying, setIsPlaying, currentMusic, volume, setCurrentMusic } =
    usePlayStore((state) => state);
  const audioRef = useRef(null);
  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
    if (volume != 1) {
      localStorage.setItem("volume", JSON.stringify(volume));
    }
  }, [volume]);
  useEffect(() => {
    const { song } = currentMusic;
    if (song) {
      const savedCurrentMusic = JSON.parse(
        localStorage.getItem("currentMusic")
      );

      if (audioRef.current.src != `/music/${song.albumId}/0${song.id}.mp3`) {
        audioRef.current.src = `/music/${song.albumId}/0${song.id}.mp3`;
      }
      if (isPlaying) {
        localStorage.setItem("currentMusic", JSON.stringify(currentMusic));

        audioRef.current.play();
      }
    }
  }, [currentMusic]);
  useEffect(() => {
    const savedCurrentMusic = JSON.parse(localStorage.getItem("currentMusic"));

    if (savedCurrentMusic) {
      setCurrentMusic(savedCurrentMusic);
    }
  }, []);
  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <div className=" flex flex-row justify-between items-center w-full  border-0 m-0 p-0 z-50">
      <div>
        <CurrentSong {...currentMusic.song} />
      </div>
      <div className="grid gap-4 place-content-center flex-1">
        <div className="flex flex-col justify-center items-center">
          <button
            className=" rounded-full bg-white fill-black p-2"
            onClick={handleClick}
          >
            {isPlaying &&
            currentMusic != { playlist: null, song: null, songs: [] } ? (
              <Pause />
            ) : (
              <Play />
            )}
          </button>

          <ProgressAudio audio={audioRef} />

          <audio ref={audioRef}></audio>
        </div>
      </div>
      <div className="flex items-center justify-around place-content-center gap-x-4">
        <button className="hover:blur">
          <a href="/queue">
            <Queue />
          </a>
        </button>
        <VolumenControl />
      </div>
    </div>
  );
}

export default Player;
