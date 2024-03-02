import type { APIRoute } from "astro";
import axios from "axios";
import { type PlaylistsType } from "@/types/playlists.ts";

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;

    // Obtener el valor del parámetro "access_token"
    const access_token = params.get("access_token");

    // Realizar alguna acción con el token de acceso
    const playlists: PlaylistsType = (await getFollowedPlaylists(access_token!))
      .items;

    return new Response(
      JSON.stringify({
        message: "exito",
        playlists: playlists,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error,
      }),
      { status: 400 }
    );
  }
};

const getFollowedPlaylists = async (access_token: string) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/playlists",
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
