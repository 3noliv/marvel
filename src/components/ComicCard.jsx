import React, { useState } from "react";
import "./Modal.css"; // Asegúrate de que los estilos están importados

const ComicCard = ({ comic }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Tarjeta de cómic */}
      <div className="comic-card" onClick={openModal}>
        <img src={comic.imageUrl} alt={comic.title} />
        <h3>{comic.title}</h3>
        <p>{comic.description}</p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div>
          <div
            className={`modal-overlay ${isModalOpen ? "active" : ""}`}
            onClick={closeModal}
          ></div>
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              ×
            </button>
            <h3>{comic.title}</h3>
            <img
              className="comic-thumbnail"
              src={comic.imageUrl}
              alt={comic.title}
            />
            <p>{comic.description}</p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComicCard;
