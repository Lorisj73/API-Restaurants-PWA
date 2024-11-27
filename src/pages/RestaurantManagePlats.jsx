import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const RestaurantManagePlats = () => {
  const [plats, setPlats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    id: null,
    nom: "",
    photo: "",
    prixUnitaire: "",
  });

  const fetchPlats = async () => {
    try {
      const response = await axiosInstance.get(`/plats/1`); // Remplacez `1` par l'ID du restaurant connecté
      setPlats(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des plats :", error);
    }
  };

  useEffect(() => {
    fetchPlats();
  }, []);

  const handleDeletePlat = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce plat ?")) {
      try {
        await axiosInstance.delete(`/plats/${id}`);
        fetchPlats(); // Rafraîchir la liste des plats
      } catch (error) {
        console.error("Erreur lors de la suppression du plat :", error);
      }
    }
  };

  const handleOpenModal = (plat = { id: null, nom: "", photo: "", prixUnitaire: "" }) => {
    setModalData(plat);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData({ id: null, nom: "", photo: "", prixUnitaire: "" });
  };

  const handleSavePlat = async () => {
    try {
      if (modalData.id) {
        // Modification
        await axiosInstance.put(`/plats/${modalData.id}`, {
          nom: modalData.nom,
          photo: modalData.photo,
          prixUnitaire: modalData.prixUnitaire,
        });
      } else {
        // Ajout
        await axiosInstance.post(`/plats/1`, {
          nom: modalData.nom,
          photo: modalData.photo,
          prixUnitaire: modalData.prixUnitaire,
        });
      }
      fetchPlats(); // Rafraîchir la liste
      handleCloseModal();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du plat :", error);
    }
  };

  return (
    <div>
      <h2>Gérer les Plats</h2>
      <button
        onClick={() => handleOpenModal()}
        style={{
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Ajouter un plat
      </button>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {plats.map((plat) => (
          <div
            key={plat.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              margin: "10px",
              width: "200px",
            }}
          >
            <h3>{plat.nom}</h3>
            <img
              src={plat.photo || "placeholder.jpg"}
              alt={plat.nom}
              style={{ width: "100%", height: "100px", objectFit: "cover" }}
            />
            <p>Prix: {plat.prixUnitaire} €</p>
            <button
              onClick={() => handleOpenModal(plat)}
              style={{
                marginRight: "10px",
                padding: "5px",
                backgroundColor: "blue",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Modifier
            </button>
            <button
              onClick={() => handleDeletePlat(plat.id)}
              style={{
                padding: "5px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>

      {/* Modale */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            zIndex: 1000,
          }}
        >
          <h3>{modalData.id ? "Modifier un plat" : "Ajouter un plat"}</h3>
          <label>
            Nom :
            <input
              type="text"
              value={modalData.nom}
              onChange={(e) => setModalData({ ...modalData, nom: e.target.value })}
              style={{ display: "block", marginBottom: "10px" }}
            />
          </label>
          <label>
            Photo (URL) :
            <input
              type="text"
              value={modalData.photo}
              onChange={(e) => setModalData({ ...modalData, photo: e.target.value })}
              style={{ display: "block", marginBottom: "10px" }}
            />
          </label>
          <label>
            Prix unitaire :
            <input
              type="number"
              value={modalData.prixUnitaire}
              onChange={(e) =>
                setModalData({ ...modalData, prixUnitaire: parseFloat(e.target.value) })
              }
              style={{ display: "block", marginBottom: "10px" }}
            />
          </label>
          <button
            onClick={handleSavePlat}
            style={{
              marginRight: "10px",
              padding: "10px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Sauvegarder
          </button>
          <button
            onClick={handleCloseModal}
            style={{
              padding: "10px",
              backgroundColor: "grey",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Annuler
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantManagePlats;
