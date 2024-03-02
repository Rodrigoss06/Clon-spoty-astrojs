import { type APIRoute } from "astro";
import axios from "axios";

export const GET: APIRoute = async ({request}) => {
  try {
    const url = new URL(request.url);
    const params = url.searchParams;


    // Obtener el valor del parámetro "access_token"
    const access_token = params.get("access_token");
    const artist_id = params.get("artist_id")
    // Realizar alguna acción con el token de acceso
    const topAlbums : any = await getTopAlbumsArtist(access_token!,artist_id!)

    return new Response(
      JSON.stringify({
        message: "exito",
        topAlbums: topAlbums
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error,
      }),
      { status: 400 }
    );
  }
};

const getTopAlbumsArtist = async (access_token: string, artist_id: string) => {
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artist_id}/albums`,
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
