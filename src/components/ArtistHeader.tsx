import React, { useEffect, useState } from "react";
import axios from "axios";
import { type Artist } from "@/types/artists";
interface Props {
  artist_id: string;
}
function ArtistHeader({ artist_id}: Props) {
  const [artist, setArtist] = useState<Artist>();
  const [album,setAlbum]= useState()
  useEffect(() => {
    const fetchAlbums = async()=>{
      try {
        const access_token = localStorage.getItem("access_token") || "";
        const AlbumsResponse:any= await axios.get(`http://localhost:4321/api/artist/topAlbums`, {
            params: { access_token, artist_id },
          })
          console.log(AlbumsResponse.data.topAlbums.items)
          console.log(artist)
          setAlbum(AlbumsResponse.data.topAlbums)
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    }
    const fetchArtist = async () => {
      const access_token = localStorage.getItem("access_token") || "";
      try {
        const artistResponse:any= await axios.get(`http://localhost:4321/api/artist/${artist_id}`, {
            params: { access_token, artist_id },
          })
          setArtist(artistResponse.data.artist)
      } catch (error) {
        console.log("Error al obtener los datos");
      }
    };
    fetchArtist();
    fetchAlbums()
  }, []);
  return (
    <header className="flex pt-8 mx-6 gap-6" style={{
      backgroundImage: `url(${artist?.images[2].url})`,
      backgroundPosition: 'top',
      backgroundSize: 'cover',
      filter: 'blur(1px)',
    }}>
      
      {artist ? (
        <div className="flex flex-col justify-between">
          <span className="flex flex-1 items-end text-sm">artista verificado</span>
          <div>
            <span className="xl:text-7xl lg:text-5xl md:text-3xl sm:text-2xl text-xl font-bold block my-3">
              {artist?.name}
            </span>
          </div>
          <div className="flex flex-1 items-end">
            <span className="text-sm">
                {artist?.followers.total} seguidores
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-end align-middle">
          
        </div>
      )}
    </header>
  );
}

export default ArtistHeader;
