import axios from "axios";
//generar Código de autorización con PKCE Flow
export const generateRandomString = (length: any) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};
export const sha256 = async (plain: any) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};
export const base64encode = (input: any) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};
export const generateParams = (codeChallenge:any, redirectUri:any,client_id:any) => {
  return {
    response_type: "code",
    client_id: client_id,
    scope: "user-follow-read playlist-read-private user-library-read",
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  };
};

export const getToken = async (code: any,redirectUri:any,codeVerifier:any) => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        client_id: import.meta.env.PUBLIC_CLIENT_ID,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return {"access_token":response.data.access_token,"refresh_token":response.data.refresh_token}
  } catch (error) {
    console.log(error)
    return error
  }
};
