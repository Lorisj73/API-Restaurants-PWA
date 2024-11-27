import React, { useEffect, useState } from "react";
import {
  getCart,
  clearCart,
  decreaseQuantity,
  removeFromCart,
  addToCart,
} from "../api/cartService"; // Assurez-vous que `addToCart` est bien défini dans `cartService`
import { validateOrder } from "../api/cartService";

const Cart = () => {
  const [cart, setCart] = useState(null);

  // Récupérer le panier
  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (error) {
      console.error("Erreur lors de la récupération du panier :", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Vider complètement le panier
  const handleClearCart = async () => {
    if (window.confirm("Voulez-vous vraiment vider votre panier ?")) {
      try {
        await clearCart();
        alert("Votre panier a été vidé.");
        fetchCart(); // Mettre à jour le panier après suppression
      } catch (error) {
        console.error("Erreur lors du vidage du panier :", error);
        alert("Une erreur est survenue lors du vidage de votre panier.");
      }
    }
  };

  // Réduire la quantité d'un produit
  const handleDecreaseQuantity = async (platId) => {
    try {
      await decreaseQuantity(platId);
      fetchCart(); // Mettre à jour le panier après modification
    } catch (error) {
      console.error("Erreur lors de la réduction de la quantité :", error);
      alert("Une erreur est survenue lors de la modification de votre panier.");
    }
  };

  // Ajouter une unité à la quantité d'un produit
  const handleIncreaseQuantity = async (platId) => {
    try {
      await addToCart(platId, 1); // On utilise `addToCart` avec une quantité de 1
      fetchCart(); // Mettre à jour le panier après modification
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
      alert("Une erreur est survenue lors de l'ajout au panier.");
    }
  };

  // Supprimer complètement un produit
  const handleRemoveFromCart = async (platId) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet article du panier ?")) {
      try {
        await removeFromCart(platId);
        fetchCart(); // Mettre à jour le panier après suppression
      } catch (error) {
        console.error("Erreur lors de la suppression du produit :", error);
        alert("Une erreur est survenue lors de la suppression de cet article.");
      }
    }
  };

  // Valider la commande
  const handleValidateOrder = async () => {
    if (window.confirm("Voulez-vous vraiment valider votre commande ?")) {
      try {
        const response = await validateOrder();
        alert(response.message);
        fetchCart(); // Mettre à jour le panier après validation
      } catch (error) {
        console.error("Erreur lors de la validation de la commande :", error);
        alert("Une erreur est survenue lors de la validation de votre commande.");
      }
    }
  };

  if (!cart) {
    return <p>Chargement du panier...</p>;
  }

  if (!cart.CartItems || cart.CartItems.length === 0) {
    return <p>Votre panier est vide.</p>;
  }

  // Calculer le coût total du panier
  const totalCost = cart.CartItems.reduce((acc, item) => {
    const itemTotal = item.quantity * item.Plat.prixUnitaire;
    return acc + itemTotal;
  }, 0);

  return (
    <div>
      <h2>Mon Panier</h2>
      <button
        onClick={handleValidateOrder}
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px",
          marginBottom: "20px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Valider la commande
      </button>
      <button
        onClick={handleClearCart}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px",
          marginBottom: "20px",
          border: "none",
          cursor: "pointer",
          marginLeft: "10px",
        }}
      >
        Vider le panier
      </button>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {cart.CartItems.map((item) => {
          const itemTotal = item.quantity * item.Plat.prixUnitaire;
          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                border: "1px solid #ddd",
                padding: "10px",
              }}
            >
              <img
                src={item.Plat?.photo || "placeholder.jpg"}
                alt={item.Plat?.nom || "Nom du plat"}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div>
                <h3>{item.Plat?.nom || "Nom du plat"}</h3>
                <p>Restaurant ID : {item.Plat?.restaurantId || "Inconnu"}</p>
                <p>Quantité : {item.quantity || 0}</p>
                <p>Prix unitaire : {item.Plat?.prixUnitaire || "Non disponible"} €</p>
                <p>
                  Prix total : <strong>{itemTotal.toFixed(2)} €</strong>
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button
                  onClick={() => handleDecreaseQuantity(item.Plat.id)}
                  style={{
                    backgroundColor: "orange",
                    color: "white",
                    padding: "5px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Réduire quantité
                </button>
                <button
                  onClick={() => handleIncreaseQuantity(item.Plat.id)}
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    padding: "5px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Ajouter quantité
                </button>
                <button
                  onClick={() => handleRemoveFromCart(item.Plat.id)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "5px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <h3 style={{ marginTop: "20px" }}>
        Coût total du panier : <strong>{totalCost.toFixed(2)} €</strong>
      </h3>
    </div>
  );
};

export default Cart;
