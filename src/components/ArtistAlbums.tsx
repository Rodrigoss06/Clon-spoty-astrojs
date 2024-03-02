import React, { useEffect, useState } from "react";
import axios from "axios";
import { type Album } from "@/types/albums";
import CardPlayButton from "./CardPlayButton";
import { songs, allPlaylists } from "@/pages/api/me/artists";
import { usePlayStore } from "@/store/playerStore";
const playlist = allPlaylists.find((playlist: any) => playlist.id == 1);
const playlistLocalSongs = songs.filter(
  (song: any) => song.albumId == playlist?.albumId
);
interface Props {
  artist_id: string;
}
function ArtistAlbums({artist_id}: Props) {
    const [albums,setAlbums] = useState<Album[]>()
    const { currentMusic } = usePlayStore((state) => state);
    useEffect(() => {
        const fetchArtistTopAlbums = async () => {
          const access_token = localStorage.getItem("access_token") || "";
          try {

            const artistResponse:any= await axios.get(`http://localhost:4321/api/artist/topAlbums`, {
                params: { access_token, artist_id },
              })
              setAlbums(artistResponse.data.topAlbums.items)
          } catch (error) {
            console.log("Error al obtener los datos");
          }
        };
        fetchArtistTopAlbums();
      }, []);
  return (
    <div className="bg-[#121212] px-6 py-4">
      <h2 className="font-semibold text-2xl">Top Albums</h2>
      <section className="flex flex-wrap gap-4 ">
      {albums? albums.map((album)=>( 
        <article className="group relative " key={album.id}>
          <div className="absolute z-10 right-5 bottom-[70px] opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-[-9px]">
            <CardPlayButton
              id={album.id}
              playlist={allPlaylists[0]}
              song={songs[0]}
              songs={songs}
            />
          </div>
          <a
            href={`/playlist/${album.id}`}
            className="playlist-item p-4 w-[209px] flex flex-col relative overflow-hidden gap-5 rounded-lg bg-[#121212] hover:bg-zinc-800"
          >
            <picture className="h-auto w-[177px]  flex-none">
              <img
                src={album.images[0].url}
                alt={`Cover of ${album.name} by ${album.label}`}
                className="object-cover w-[177px] h-auto  rounded-[4px]"
              />
            </picture>
            <div className="px-0 flex flex-auto flex-col truncate justify-start">
              <h4 className="text-[#E9E9E9] text-sm font-semibold pb-1">
                {album.name}
              </h4>
              <span className="text-xs text-[#949494]">
                {album.label}
              </span>
            </div>
          </a>
        </article>)):<h1 className="hidden"></h1>}
      </section>
    </div>
  )
}

export default ArtistAlbums