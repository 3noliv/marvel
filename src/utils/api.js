import axios from "axios";
import md5 from "blueimp-md5";

const publicKey = "712ac354dc21f31dfd1253d3e402fa22";
const privateKey = "933db133e53047cf7ffd5e8dbdf09929695413cf";
const ts = Date.now();

const hash = md5(ts + privateKey + publicKey);

const api = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public",
  params: {
    ts,
    apikey: publicKey,
    hash,
  },
});

export const getLatestComics = async () => {
  try {
    const response = await api.get("/comics", {
      params: {
        orderBy: "-modified",
      },
    });
    
    return response.data.data.results;
  } catch (error) {
    console.error(
      "Error al obtener los cómics:",
      error.response?.data || error.message
    );
    return [];
  }
};

export const getComicCharacters = async (comicId) => {
  try {
    const response = await api.get(`/comics/${comicId}/characters`);
    return response.data.data.results;
  } catch (error) {
    console.error(
      "Error al obtener los personajes:",
      error.response?.data || error.message
    );
    return [];
  }
};
