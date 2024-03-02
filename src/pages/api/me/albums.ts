import axios from "axios";
import type { APIRoute } from "astro";
import { type Item } from "@/types/albums";

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;

    // Obtener el valor del parámetro "access_token"
    const access_token = params.get("access_token");


    const albums: Item[]  = (await getFollowedAlbums(access_token!)).items;

    return new Response(
      JSON.stringify({
        message: "exito",
        albums: albums,
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

const getFollowedAlbums = async (access_token: string) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/me/albums", 
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
