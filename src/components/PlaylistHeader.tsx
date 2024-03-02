import React, { useEffect, useState } from "react";
import axios from "axios";
import ContentLoader from "react-content-loader";
import { type Playlist as PlaylistLocal } from "../pages/api/me/artists";

import { type Playlist } from "@/types/playlists";
interface Props {
  playlist_id: string;
  playlistLocal?: PlaylistLocal;
}
function PlaylistHeader({ playlist_id, playlistLocal }: Props) {
  const [playlist, setPlaylist] = useState<Playlist>();
  const [songs, setSongs] = useState([]);
  useEffect(() => {
    const fetchSongsPlaylist = async () => {
      const access_token = localStorage.getItem("access_token") || "";
      try {
        const [playlistsResponse, songsResponse] = await Promise.all([
          axios.get(`http://localhost:4321/api/me/playlists`, {
            params: { access_token },
          }),
          axios.get(`http://localhost:4321/api/songs/${playlist_id}`, {
            params: { access_token, playlist_id },
          }),
        ]);
        const playlis = playlistsResponse.data.playlists.filter(
          (playlist: Playlist) => playlist.id === playlist_id
        );

        setPlaylist(playlis[0]);
        setSongs(songsResponse.data.data.items);
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    };
    fetchSongsPlaylist();
  }, []);
  return (
    <header className="flex pt-8 mx-6 gap-6">
      {playlistLocal ? (
        <picture className="aspect-square xl:w-56 lg:w-48 md:w-40 sm:w-32 w-28 flex-none">
          <img
            src={playlistLocal?.cover}
            alt={`Cover of ${playlistLocal?.title}`}
            className="object-cover w-full h-full"
          />
        </picture>
      ) : playlist ? (
        <picture className="aspect-square xl:w-56 lg:w-48 md:w-40 sm:w-32 w-28 flex-none">
          <img
            src={playlist?.images[0].url}
            alt={`Cover of ${playlist?.name}`}
            className="object-cover w-full h-full"
          />
        </picture>
      ) : (
        <div className="aspect-square xl:w-56 lg:w-48 md:w-40 sm:w-32 w-28 flex-none">
          <ContentLoader
            speed={0}
            width={224}
            height={224}
            viewBox="0 0 224 224"
            backgroundColor="#b49797"
            foregroundColor="#e0c2c2"
          >
            <rect x="0" y="0" rx="5" ry="5" width="224" height="224" />
          </ContentLoader>
        </div>
      )}
      {playlistLocal ? (
        <div className="flex flex-col justify-between">
          <span className="flex flex-1 items-end text-sm">Playlist</span>
          <div>
            <span className="xl:text-7xl lg:text-5xl md:text-3xl sm:text-2xl text-xl font-bold block my-3">
              {playlistLocal.title}
            </span>
          </div>
          <div className="flex flex-1 items-end">
            <span className="text-sm">
              <a href="/user" className="font-semibold hover:border-b-[1px]">
                usuario
              </a>{" "}
              - {songs?.length} canciones
            </span>
          </div>
        </div>
      ) : playlist ? (
        <div className="flex flex-col justify-between">
          <span className="flex flex-1 items-end text-sm">Playlist</span>
          <div>
            <span className="xl:text-7xl lg:text-5xl md:text-3xl sm:text-2xl text-xl font-bold block my-3">
              {playlist?.name}
            </span>
          </div>
          <div className="flex flex-1 items-end">
            <span className="text-sm">
              <a href="/user" className="font-semibold hover:border-b-[1px]">
                usuario
              </a>{" "}
              - {songs?.length} canciones
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-end align-middle">
          <ContentLoader
            speed={0}
            width={600}
            height={150}
            viewBox="0 0 600 150"
            backgroundColor="#b49797"
            foregroundColor="#e0c2c2"
          >
            <rect x="0" y="20" rx="4" ry="4" width="600" height="70" />
            <rect x="0" y="100" rx="4" ry="4" width="150" height="20" />
            <rect x="0" y="130" rx="4" ry="4" width="300" height="20" />
          </ContentLoader>
        </div>
      )}
    </header>
  );
}

export default PlaylistHeader;
