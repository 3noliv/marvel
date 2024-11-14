import React from "react";
import "./Modal.css";

function ComicDetailModal(props) {
  console.log("Propiedades recibidas en ComicDetailModal:", props);

  const {
    comic,
    characters = [],
    onClose,
    addToFavoritesFunc,
    removeFromFavoritesFunc,
    isFavoriteFlag,
  } = props;

  const handleOverlayClick = (e) => {
    if (e.target.className === "modal-overlay active") {
      onClose();
    }
  };

  const handleFavoriteClick = () => {
    if (isFavoriteFlag) {
      removeFromFavoritesFunc(comic.id);
    } else {
      addToFavoritesFunc(comic);
    }
  };

  return (
    <div className="modal-overlay active" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="modal-left">
          <img
            className="comic-thumbnail"
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
          />
          <h3 className="comic-title">{comic.title}</h3>
        </div>
        <div className="modal-right">
          <p className="comic-description">
            {comic.description || "La descripción no está disponible"}
          </p>
          <h4>Personajes:</h4>
          {characters.length > 0 ? (
            <ul>
              {characters.map((character) => (
                <li key={character.id}>
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                    className="character-thumbnail"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay personajes disponibles</p>
          )}
          <button onClick={handleFavoriteClick} className="favorite-button">
            {isFavoriteFlag ? "Eliminar de Favoritos" : "Añadir a Favoritos"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComicDetailModal;
