const Icon = () => (
  <svg
    data-encore-id="icon"
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
    className="Svg-sc-ytk21e-0 dYnaPI"
  >
    <path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z"></path>
  </svg>
);
import { songs, allPlaylists } from "../pages/api/me/artists";

import ItemTableSong from "@/components/ItemTableSong";
import React, { useEffect, useState } from "react";
import { usePlayStore } from "../store/playerStore";
import type { Song } from "@/pages/api/me/artists";
function PlayQueue() {
  const [songLocal,setSongLocal] = useState<Song>()
  const [playlistSongsLocal, setPlaylistSongsLocal]= useState<Song[]>()
  const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } =
      usePlayStore((state) => state);
  useEffect(() => {
    
    const albumId =
      currentMusic && currentMusic.song && currentMusic.song.albumId;
    const playlist = allPlaylists.find(
      (playlist: any) => playlist.id == albumId
    );
    const playlistLocalSongs = songs.filter(
      (song: any) => song.albumId == playlist?.albumId
    );
    setSongLocal(currentMusic?.song)
    setPlaylistSongsLocal(playlistLocalSongs)
  }, [songLocal]);
  return (
    <>
      {playlistSongsLocal? (<section className="text-[#868686] mx-4 mt-10">
      <h1 className="font-bold text-white text-2xl mb-2">
        Cola de reproducción
      </h1>
      <h2 className="font-semibold mb-2">Estás escuchando</h2>
      <ItemTableSong songLocal={songLocal} index={songLocal?.id!} />
      <h2 className="font-semibold mt-8 mb-2">
        Próximas canciones de: <a href="#">#Tus me gusta#</a>
      </h2>
      {playlistSongsLocal!.slice(songLocal?.id!,playlistSongsLocal!.length).map((song, index) => (
        <ItemTableSong songLocal={song} index={index+songLocal?.id!+1} />
      ))}
    </section>):(<h1>2222222222</h1>)}
    </>
  );
}

export default PlayQueue;
