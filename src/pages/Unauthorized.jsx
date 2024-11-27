import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
      <h1>Accès refusé</h1>
      <p>Vous n'avez pas la permission d'accéder à cette page.</p>
      <Link to="/dashboard">Retour au tableau de bord</Link>
    </div>
  );
};

export default Unauthorized;
