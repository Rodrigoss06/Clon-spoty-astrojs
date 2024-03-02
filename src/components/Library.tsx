import React, { useEffect, useRef, useState } from "react";
import Badge from "./Badge.jsx";
import SideCard from "./SideCard.tsx";
import { playlists as playlistLocal } from "../pages/api/me/artists.ts";
import axios from "axios";
import { type PlaylistsType } from "@/types/playlists.ts";
import { type Artists } from "@/types/artists.ts";
import { type Item } from "@/types/albums.ts";

interface SideMenuItemProps {
  href: string;
  className: string;
  children?: React.ReactNode;
}

const SideMenuItem: React.FC<SideMenuItemProps> = ({
  href,
  className,
  children,
}) => (
  <li>
    <a
      className={`${className} flex gap-4 fill-[#b3b3b3] text-[#b3b3b3] hover:text-white hover:fill-white py-3 px-5 font-bold font transition duration-300`}
      href={href}
    >
      {children}
    </a>
  </li>
);

const LibraryIcon: React.FC = () => (
  <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24">
    <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path>
  </svg>
);

const Library: React.FC = () => {
  const [libraryData, setLibraryData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [toggle, setToggle] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const access_token = localStorage.getItem("access_token") || "";

      try {
        const [artistsResponse, playlistsResponse, albumsResponse] =
          await Promise.all([
            axios.get(`http://localhost:4321/api/me/artists`, {
              params: { access_token },
            }),
            axios.get(`http://localhost:4321/api/me/playlists`, {
              params: { access_token },
            }),
            axios.get(`http://localhost:4321/api/me/albums`, {
              params: { access_token },
            }),
          ]);

        const artists = artistsResponse.data.artists.map((artist: any) => ({
          ...artist,
          type: "artist",
        }));
        const playlists = playlistsResponse.data.playlists.map(
          (playlist: any) => ({
            ...playlist,
            type: "playlist",
          })
        );
        const albums = albumsResponse.data.albums.map((album: any) => ({
          ...album.album,
          type: "album",
        }));
        setLibraryData([...artists, ...playlists, ...albums]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const asideContentRef = useRef(null);

  useEffect(() => {
    const resizeObserverCallback = (entries:any) => {
      const element = entries[0];
      const contentWidth = element.contentRect.width;
      const hiddenElements = Array.from(
        document.getElementsByClassName(
          "responsive-hidden"
        ) as HTMLCollectionOf<HTMLElement>
      );
      hiddenElements.forEach((e) => {
        e.style.display = contentWidth < 100 ? "none" : "block";
      });
    };

    const resizeObserver = new ResizeObserver(resizeObserverCallback);

    // Observar el cambio de tamaño del elemento asideContent
    if (asideContentRef.current) {
      resizeObserver.observe(asideContentRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Aplicar estilo condicional al span

  return (
    <ul className="w-full aside-content" ref={asideContentRef} id="aside-content">
      <SideMenuItem className="ml-[-4px] mb-[-2px] pl-6" href="#">
        <a
          className="flex flex-shrink-0 gap-x-2 justify-start min-block-size:40px overflow-hidden"
          href="#"
        >
          <LibraryIcon />
          <span className="responsive-hidden">Tu biblioteca</span>
        </a>
      </SideMenuItem>
      <div className="flex gap-x-3 pl-1 mb-2">
        {toggle !== "all" && (
          <Badge className="responsive-hidden" handleClick={() => setToggle("all")}>
            <span>X</span>
          </Badge>
        )}
        <Badge className="responsive-hidden">
          <span onClick={() => setToggle("playlists")}>Playlists</span>
        </Badge>
        <Badge className="responsive-hidden">
          <span onClick={() => setToggle("artists")}>Artists</span>
        </Badge >
        <Badge className="responsive-hidden">
          <span onClick={() => setToggle("albums")}>Albums</span>
        </Badge>
      </div>
      {loading ? (
        playlistLocal.map((playlist: any) => (
          <SideCard playlistLocal={playlist} key={playlist.id} />
        ))
      ) : (
        <>
          {libraryData.length > 0 ? (
            <>
              {toggle === "all" &&
                libraryData.map((item: any) => (
                  <SideCard item={item} itemType={item.type} key={item.id} />
                ))}
              {toggle === "artists" &&
                libraryData
                  .filter((item: any) => item.type === "artist")
                  .map((item: any) => (
                    <SideCard item={item} itemType={item.type} key={item.id} />
                  ))}
              {toggle === "playlists" &&
                libraryData
                  .filter((item: any) => item.type === "playlist")
                  .map((item: any) => (
                    <SideCard item={item} itemType={item.type} key={item.id} />
                  ))}
              {toggle === "albums" &&
                libraryData
                  .filter((item: any) => item.type === "album")
                  .map((item: any) => (
                    <SideCard item={item} itemType={item.type} key={item.id} />
                  ))}
            </>
          ) : (
            playlistLocal.map((playlist: any) => (
              <SideCard playlistLocal={playlist} key={playlist.id} />
            ))
          )}
        </>
      )}
    </ul>
  );
};

export default Library;
