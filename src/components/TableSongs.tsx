import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemTableSong from "./ItemTableSong.tsx";
import { type Track } from "@/types/track.ts";
import { type Songs } from "@/types/songs.ts";
const Tiempo = () => (
  <svg
    data-encore-id="icon"
    height="16px"
    width="16px"
    fill="currentColor"
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
    <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
  </svg>
);
interface Props {
  playlist_id?: string;
  artist_id?: string;
}
function TableSongs({ playlist_id, artist_id }: Props) {
  const [songs, setSongs] = useState<Songs>([]);
  const [tracks, setTracks] = useState<Track[]>([])
  const [onTrack,setOnTrack]= useState(false)
  useEffect(() => {
    const fetchSongsPlaylist = async () => {
      const access_token = localStorage.getItem("access_token") || "";
      try {
        if (playlist_id) {
          const response = await axios.get(
            `http://localhost:4321/api/songs/${playlist_id}`,
            {
              params: {
                access_token,
                playlist_id,
              },
            }
          );

          setSongs(response?.data.data.items);
        } else {
          const artistSongsResponse: any = await axios.get(
            `http://localhost:4321/api/artist/topTracks`,
            {
              params: {
                access_token,
                artist_id,
              },
            }
          );

          setTracks(artistSongsResponse.data.topTracks.tracks);
          setOnTrack(true)
        }
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    };
    fetchSongsPlaylist();
  }, []);
  return (
    <div className="grid grid-cols-1 relative z-10 px-6 gap-x-4 pt-6">
      <div className="grid grid-cols-[16px_minmax(120px,_4fr)_minmax(120px,_2fr)_minmax(120px,_1fr)] text-[#a7a7a7] px-4 gap-x-4 h-9 my-1 box-content border-b border-solid border-[hsla(0,0%,100%,.1)] py-2">
        <h3 className="flex justify-end items-center text-[#A7A7A7]">#</h3>
        <h3 className="flex items-center text-[#A7A7A7]">Título</h3>
        <h3 className="flex items-center text-[#A7A7A7]">Álbum</h3>
        <h3 className="flex items-center text-[#A7A7A7]">
          <Tiempo />
        </h3>
      </div>
      {onTrack? tracks.map((track, index) => (
        <ItemTableSong track={track} index={index+1} />
      )) : songs.map((song, index) => (
        <ItemTableSong song={song} index={index+1} />
      ))}
    </div>
  );
}

export default TableSongs;

