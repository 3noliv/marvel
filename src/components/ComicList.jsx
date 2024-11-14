import React, { useState } from "react";
import ComicDetailModal from "./ComicDetailModal";
import "./ComicList.css"; // Asegúrate de que esta línea esté presente

function ComicList({ comics }) {
  const [selectedComic, setSelectedComic] = useState(null);

  const openModal = (comic) => {
    setSelectedComic(comic); // Esto abre el modal con la información del cómic seleccionado
  };

  const closeModal = () => {
    setSelectedComic(null); // Esto cierra el modal al establecer null
  };

  return (
    <div className="comic-list">
      {comics.map((comic) => (
        <div
          key={comic.id}
          className="comic-card"
          onClick={() => openModal(comic)}
        >
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
          />
          <h3>{comic.title}</h3>
        </div>
      ))}

      {/* Modal que solo se muestra cuando `selectedComic` tiene un valor */}
      {selectedComic && (
        <ComicDetailModal comic={selectedComic} onClose={closeModal} />
      )}
    </div>
  );
}

export default ComicList;
