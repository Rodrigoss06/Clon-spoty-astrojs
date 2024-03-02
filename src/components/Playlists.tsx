import React, { useEffect, useState } from "react";
import PlaylistItem from "./PlaylistItem";
import axios from "axios";
import {
  playlists as playlistsLocal,
  songs as songsLocal,
} from "@/pages/api/me/artists";
import { type PlaylistsType } from "@/types/playlists";
interface Props {
  className?: string
}
function Playlists({className}:Props) {
  const [apiDates, SetapiDates] = useState("no");
  const [playlists, setPlaylists] = useState<PlaylistsType>([]);


  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const access_token = localStorage.getItem("access_token") || "";
        const response = await axios.get(`http://localhost:4321/api/me/playlists`, {
          params: { access_token },
        });
        setPlaylists(response.data.playlists);
        if (response.data.playlists != null) {
          SetapiDates("yes")
        }
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <div
      className={`${className} flex flex-wrap relative z-10 px-6 gap-4 bg-[#121212] min-w-[450px] max-w-full`}
    >
      {apiDates === "no" ? (
        playlistsLocal.map((playlist) => (
          <PlaylistItem
            key={playlist.id}
            playlist={playlist}
            songs={songsLocal.filter(
              (song) => song.albumId == playlist.albumId
            )}
          />
        ))
      ) : (
        playlists.map((playlist) => (
          <PlaylistItem
            key={playlist.id}
            playlist={{id: "string",
              albumId: 55555,
              title: "string",
              cover: "string",
              artists: ["e","s","r"]}}
            truePlaylist={playlist}
            songs={songsLocal.filter((song) => `${song.albumId}` == playlist.id)}
          />
        ))
      )}
    </div>
  );
}

export default Playlists;
