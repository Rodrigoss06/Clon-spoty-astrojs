import React, { useEffect, useState } from "react";
import { type Artist } from "@/types/artists";
import { type Playlist as PlaylistLocal } from "@/pages/api/me/artists.js";
import { type Playlist } from "@/types/playlists.ts";
import { type Album } from "@/types/albums.ts";
import  useResponsiveHidden  from "@/hooks/Responsive-hidden";
interface SideCardProps {
  playlistLocal?: PlaylistLocal;
  itemType?: "artist" | "playlist" | "album";
  item?: Artist | Playlist | Album;
  className?: string
}

const SideCard: React.FC<SideCardProps> = ({
  playlistLocal,
  itemType,
  item,
  className
}) => {
  const defaultPlaylist = {
    id: 0,
    cover: "playlist",
    title: "Default Value",
    artists: ["artista num_1", "artista num_2", "artista num_3"],
  };
  const defaultValue = playlistLocal || defaultPlaylist;
  const { id, cover, title, artists } = defaultValue!;
  const artistasString = artists.join(", ");
  const asideContentRef = useResponsiveHidden();
  return (
    <section id="container" className={`${className}`} ref={asideContentRef}>
      <div>
        {item ? (
          <a
            href="#"
            className="playlist-item py-2 flex  overflow-hidden items-center gap-y-5 rounded pl-1 hover:bg-zinc-800/30 "
          >
            {itemType === "artist" && (
              <a
              href={`http://localhost:4321/artist/${item.id}`}
                className="playlist-item  pl-1 py-2 w-full mr-2  flex relative overflow-hidden items-center gap-5 rounded  ml-2 hover:bg-zinc-800/30"
              >
                <picture className="h-12 w-12 flex-none">
                  <img
                    src={item.images[0].url}
                    alt={`img ${item.name}`}
                    className="object-cover w-full h-full rounded-full"
                  />
                </picture>
                <div className="responsive-hidden"><div className="px-0 mx-[-7px] flex flex-auto flex-col truncate">
                  <h4 className="text-[#E9E9E9] text-base font-medium ">
                    {item.name}
                  </h4>
                  <span className="text-sm text-[#949494] capitalize">
                    {item.type}
                  </span>
                </div></div>
              </a>
            )}
            {itemType === "playlist" && (
              <a
                href={`http://localhost:4321/playlist/${item.id}`}
                className="playlist-item  py-2 w-full mr-2 pl-1 flex relative overflow-hidden items-center gap-5 rounded  ml-2 hover:bg-zinc-800/30"
              >
                <picture className="h-12 w-12 flex-none">
                  <img
                    src={item.images[0].url}
                    alt={`img ${item.name}`}
                    className="object-cover w-full h-full rounded-[4px]"
                  />
                </picture>
                <div className="responsive-hidden"><div className="px-0 mx-[-7px] flex flex-auto flex-col truncate">
                  <h4 className="text-[#E9E9E9] text-base font-medium">
                    {item.name}
                  </h4>
                  <span className="text-sm text-[#949494] capitalize">
                    {item.type}
                  </span>
                </div></div>
              </a>
            )}
            {itemType === "album" && (
              <a
                href="#"
                className="playlist-item pl-1 py-2 w-full mr-2 flex relative overflow-hidden items-center gap-5 rounded  ml-2 hover:bg-zinc-800/30"
              >
                <picture className="h-12 w-12 flex-none">
                  <img
                    src={item.images[0].url}
                    alt={`img ${item.name}`}
                    className="object-cover w-full h-full rounded-[4px]"
                  />
                </picture>
                <div className="responsive-hidden">
                <div className="px-0 mx-[-7px] flex flex-auto flex-col truncate">
                  <h4 className="text-[#E9E9E9] text-base font-medium">
                    {item.name}
                  </h4>
                  <span className="text-sm text-[#949494] capitalize">
                    {item.type}
                  </span>
                </div>
                </div>
              </a>
            )}
          </a>
        ) : (
          <a
            href={`/playlist/${id}`}
            className="playlist-item pl-1 py-2 w-full flex relative overflow-hidden items-center gap-5 rounded  ml-2 hover:bg-zinc-800/30"
          >
            <picture className="h-12 w-12 flex-none">
              <img
                src={cover}
                alt={`Cover of ${title} by ${artistasString}`}
                className="object-cover w-full h-full rounded-[4px]"
              />
            </picture>
            <div className="responsive-hidden"><div className="px-0 mx-[-7px] flex flex-auto flex-col truncate">
              <h4 className="text-[#E9E9E9] text-sm">{title}</h4>
              <span className="text-xs text-[#949494]">{artistasString}</span>
            </div></div>
          </a>
        )}
      </div>

    </section>
  );
};

export default SideCard;
