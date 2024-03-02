import React from "react";
import CardPlayButton from "./CardPlayButton";
import { usePlayStore } from "@/store/playerStore";
import { songs, allPlaylists } from "@/pages/api/me/artists";
import TableSongs from "@/components/TableSongs";
import ItemTableSong from "@/components/ItemTableSong";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ArtistHeader from "@/components/ArtistHeader";
import ArtistAlbums from "@/components/ArtistAlbums";

function Borrar({ id }) {
  const playlist = allPlaylists.find((playlist) => playlist.id == id);
  const playlistLocalSongs = songs.filter(
    (song) => song.albumId == playlist?.albumId
  );
  const { currentMusic } = usePlayStore((state) => state);
  return (
    <div class="p-extra bg-[#121212]">
      <CardPlayButton
        id={id}
        playlist={playlist}
        song={playlistLocalSongs[0]}
        songs={playlistLocalSongs}
        currentMusic={currentMusic}
        size="large"
      />
    </div>
  );
}

export default Borrar;
