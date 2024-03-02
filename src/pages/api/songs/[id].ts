import { type APIRoute } from "astro";
import axios from "axios";
import { type Songs } from "@/types/songs";

export const GET: APIRoute = async ({request}) => {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;


    // Obtener el valor del parámetro "access_token"
    const access_token = params.get("access_token");
    const playlist_id = params.get("playlist_id")
    // Realizar alguna acción con el token de acceso
    const songs : Songs = await getSongsPlaylist(access_token!,playlist_id!)


    return new Response(
      JSON.stringify({
        message: "exito",
        data: songs
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "error",
        error: error,
      }),
      { status: 400 }
    );
  }
};

const getSongsPlaylist = async (access_token: string, playlist_id: string) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error)
  }
};
