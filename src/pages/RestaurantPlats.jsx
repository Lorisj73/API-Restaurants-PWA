// src/pages/RestaurantPlats.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { addToCart } from "../api/cartService"; // Importer la fonction pour ajouter au panier

const RestaurantPlats = () => {
  const { id } = useParams(); // Récupère l'id du restaurant depuis l'URL
  const [plats, setPlats] = useState([]);
  const [quantities, setQuantities] = useState({}); // Stocke la quantité sélectionnée pour chaque plat

  useEffect(() => {
    const fetchPlats = async () => {
      try {
        const response = await axiosInstance.get(`/plats/${id}`);
        setPlats(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des plats :", error);
      }
    };

    fetchPlats();
  }, [id]);

  // Gestion de la sélection de la quantité
  const handleQuantityChange = (platId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [platId]: quantity,
    }));
  };

  // Gestion de l'ajout au panier
  const handleAddToCart = async (platId) => {
    const quantity = quantities[platId] || 1; // Par défaut, ajouter 1 si aucune quantité n'est sélectionnée
    try {
      await addToCart(platId, quantity); // Appel API pour ajouter au panier
      alert("Plat ajouté au panier !");
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
      alert("Impossible d'ajouter le plat au panier.");
    }
  };

  return (
    <div>
      <h2>Plats du Restaurant</h2>
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
              src={plat.photo}
              alt={plat.nom}
              style={{ width: "100%", height: "150px", objectFit: "cover" }}
            />
            <p>Prix: {plat.prixUnitaire} €</p>
            <div>
              <label htmlFor={`quantity-${plat.id}`}>Quantité :</label>
              <input
                type="number"
                id={`quantity-${plat.id}`}
                min="1"
                value={quantities[plat.id] || 1} // Quantité par défaut : 1
                onChange={(e) =>
                  handleQuantityChange(plat.id, parseInt(e.target.value, 10))
                }
                style={{ width: "60px", marginLeft: "5px" }}
              />
            </div>
            <button
              onClick={() => handleAddToCart(plat.id)}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantPlats;
