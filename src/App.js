import React, { useState, useEffect } from "react";
import { getLatestComics, getComicCharacters } from "./utils/api";
import ComicList from "./components/ComicList";
import ComicDetailModal from "./components/ComicDetailModal";
import "./App.css";

function App() {
  const [comics, setComics] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedComic, setSelectedComic] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterFavorites, setFilterFavorites] = useState(false);

  // Cargar favoritos del localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Guardar favoritos en localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (comic) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, comic];
      localStorage.setItem("favorites", JSON.stringify(newFavorites)); // Actualizar localStorage
      return newFavorites;
    });
  };

  const removeFromFavorites = (comicId) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter((fav) => fav.id !== comicId);
      localStorage.setItem("favorites", JSON.stringify(newFavorites)); // Actualizar localStorage
      return newFavorites;
    });
  };

  const isFavorite = (comicId) => {
    return favorites.some((fav) => fav.id === comicId);
  };

  useEffect(() => {
    const fetchComics = async () => {
      const comicsData = await getLatestComics();
      setComics(comicsData);
    };
    fetchComics();
  }, []);

  const openModal = async (comic) => {
    const characterData = await getComicCharacters(comic.id);

    const filteredCharacters = characterData.filter(
      (character) => character.thumbnail
    );

    setSelectedComic({
      ...comic,
      characters: filteredCharacters,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedComic(null);
    setIsModalOpen(false);
  };

  const toggleFilter = () => {
    setFilterFavorites((prev) => !prev);
  };

  const filteredComics = filterFavorites
    ? comics.filter((comic) => isFavorite(comic.id))
    : comics;

  return (
    <div>
      <h1 className="text-gradient">Comics de Marvel</h1>
      <button onClick={toggleFilter}>
        {filterFavorites ? "Ver Todos" : "Ver Favoritos"}
      </button>
      <ComicList comics={filteredComics} openModal={openModal} />
      {isModalOpen && (
        <ComicDetailModal
          comic={selectedComic}
          onClose={closeModal}
          addToFavoritesFunc={addToFavorites}
          removeFromFavoritesFunc={removeFromFavorites}
          isFavoriteFlag={isFavorite(selectedComic?.id)}
        />
      )}
    </div>
  );
}

export default App;
