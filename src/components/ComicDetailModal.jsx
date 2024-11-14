// src/components/ComicDetailModal.jsx
import React from "react";
import "./Modal.css";

function ComicDetailModal({ comic, characters = [], onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target.className === "modal-overlay active") {
      onClose();
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
        </div>
      </div>
    </div>
  );
}

export default ComicDetailModal;
