// src/pages/Restaurants.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Restaurants = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchRestaurants();
    }
  }, [isAuthenticated]);

  const fetchRestaurants = async () => {
    try {
      const response = await axiosInstance.get("/restaurants");
      setRestaurants(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des restaurants:", error);
    }
  };

  if (!isAuthenticated) {
    return <p>Accès refusé : Vous devez être connecté pour voir cette page.</p>;
  }

  return (
    <div>
      <h2>Liste des Restaurants</h2>
      <div className="restaurant-cards">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
            <h3>{restaurant.nom}</h3>
            <p>Adresse : {restaurant.adresse}</p>
            <p>Ville : {restaurant.ville}</p>
            <p>Code Postal : {restaurant.codePostal}</p>
            <p>Email : {restaurant.email}</p>
            <Link to={`/restaurant/${restaurant.id}/plats`}>Voir les plats</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
