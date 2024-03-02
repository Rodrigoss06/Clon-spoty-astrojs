import { useState } from "react";
import { type Song as SongLocal } from "@/pages/api/me/artists";
import { type Song } from "@/types/songs";
import { type Track } from "@/types/track";
import { usePlayStore } from "../store/playerStore";
interface Props {
  songLocal?: SongLocal;
  song?: Song;
  track?: Track;
  index: number
  songsLocal?:SongLocal[],
  playlist?:any
}
const formatTime=(time:number)=>{
  if(time == null) return "00:00"
  const segundos = Math.floor(time % 60)
  const minutos = Math.floor(time/60)
  return `${minutos}:${segundos.toLocaleString().padStart(2,"0")}`
}
export const Play = ({className,handleClick}:{className:string,handleClick:any}) => (
  <svg role="img" className={className} onClick={handleClick} aria-hidden="true" viewBox="0 0 16 16">
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
);
export const Pause = ({className,handleClick}:{className:string,handleClick:any}) => (
  <svg  className={className} onClick={handleClick}  role="img" aria-hidden="true" viewBox="0 0 16 16">
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
);
function ItemTableSong({ songLocal, song, index, songsLocal,playlist,track }: Props) {
  const [hovered, setHovered] = useState(false)
  const handleMouseHover = ()=>{
    setHovered(true)
  }
  const handleMouseLeave = ()=>{
    setHovered(false)
  }
  const { isPlaying, setIsPlaying, currentMusic,setCurrentMusic } = usePlayStore(
    (state) => state
  );  
  const handleClickPlay = ()=>{
    // { playlist, song, songs }
    if(currentMusic.song !== songLocal){

      setCurrentMusic({playlist,song: songLocal,songs:songsLocal})
    }
    
    setIsPlaying(true)
  }
  const handleClickPause = ()=>{
    
    setIsPlaying(false)
  }
  console.log(songLocal?.id)
  console.log(currentMusic?.song?.id)
  console.log(currentMusic?.song?.albumId)
    const isMusic = currentMusic.song && currentMusic.song.id === songLocal?.id 
    const playButton = hovered
  ? isPlaying && isMusic
    ? (<Pause handleClick={handleClickPause} className="h-3 w-3 fill-white"/>)
    : (<Play handleClick={handleClickPlay} className="h-3 w-3 fill-white"/>)
  : index;



    return (
      <>
        {song ? (
          <div className="grid grid-cols-[16px_minmax(120px,_4fr)_minmax(120px,_2fr)_minmax(120px,_1fr)] gap-x-4 h-14 px-4 border border-solid border-transparent rounded hover:bg-white/10  " onMouseEnter={handleMouseHover} onMouseLeave={handleMouseLeave}>
            <div onClick={handleClickPlay} className="flex justify-end items-center text-[#A7A7A7]" >
              {playButton}
          </div>
          <div className="flex items-center  ">
            <picture className="w-10 h-10 aspect-square mr-3 bg-[#282828] object-center object-cover ">
              <img
                className="flex flex-shrink-0 rounded object-center  object-cover w-full h-full"
                src={song.track.album.images[2].url}
                alt={`image from ${song.track.name}`}
              />
            </picture>
            <div className="flex flex-col">
              <h2>{song.track.name}</h2>
              <h4 className="text-sm text-[#A7A7A7]">
                {song?.track.artists.map(e=>e.name).join(", ")}
              </h4>
            </div>
          </div>
          <h2 className="flex items-center text-[#A7A7A7]">
            {song.track.album.name}
          </h2>
          <h2 className="flex items-center text-[#A7A7A7]">
            {formatTime(song.track.duration_ms/1000)}
          </h2>
        </div>
      ) : track? (<div className="grid grid-cols-[16px_minmax(120px,_4fr)_minmax(120px,_2fr)_minmax(120px,_1fr)] gap-x-4 h-14 px-4 border border-solid border-transparent rounded hover:bg-white/10  " onMouseEnter={handleMouseHover} onMouseLeave={handleMouseLeave}>
      <div onClick={handleClickPlay} className="flex justify-end items-center text-[#A7A7A7]" >
        {playButton}
    </div>
    <div className="flex items-center  ">
      <picture className="w-10 h-10 aspect-square mr-3 bg-[#282828] object-center object-cover ">
        <img
          className="flex flex-shrink-0 rounded object-center  object-cover w-full h-full"
          src={track.album.images[2].url}
          alt={`image from ${track.name}`}
        />
      </picture>
      <div className="flex flex-col">
        <h2>{track.name}</h2>
        <h4 className="text-sm text-[#A7A7A7]">
          {track.artists.map(e=>e.name).join(", ")}
        </h4>
      </div>
    </div>
    <h2 className="flex items-center text-[#A7A7A7]">
      {track.album.name}
    </h2>
    <h2 className="flex items-center text-[#A7A7A7]">
      {formatTime(track.duration_ms/1000)}
    </h2>
  </div>):(
        <div className="grid grid-cols-[16px_minmax(120px,_4fr)_minmax(120px,_2fr)_minmax(120px,_1fr)] gap-x-4 h-14 px-4 border border-solid border-transparent rounded hover:bg-white/10  "  onMouseMove={()=>setHovered(true)}
        onMouseLeave={()=>setHovered(false)}>
          <div  className="flex justify-end items-center text-[#A7A7A7]" >
            {playButton}
          </div>
          <div className="flex items-center">
            <picture className="w-10 h-10 aspect-square mr-3 bg-[#282828] object-center object-cover ">
              <img
                className="flex flex-shrink-0 rounded object-center  object-cover w-full h-full"
                src={songLocal?.image}
                alt={`image from ${songLocal?.title}`}
              />
            </picture>
            <div className="flex flex-col">
              <h2>{songLocal?.title}</h2>
              <h4 className="text-sm text-[#A7A7A7]">
                {songLocal?.artists.join(", ")}
              </h4>
            </div>
          </div>
          <h2 className="flex items-center text-[#A7A7A7]">
            {songLocal?.album}
          </h2>
          <h2 className="flex items-center text-[#A7A7A7]">
            {songLocal?.duration}
          </h2>
        </div>
      )}
    </>
  );
}

export default ItemTableSong;
