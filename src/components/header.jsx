import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/features/auth/authSlice";

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        backgroundColor: "#f0f0f0",
      }}
    >
      <h1>Restaurant App</h1>

      {isAuthenticated ? (
        <nav>
          <ul
            style={{
              display: "flex",
              listStyleType: "none",
              gap: "20px",
              margin: 0,
            }}
          >
            {user?.role === "user" && (
              <>
                <li>
                  <Link to="/restaurants">Liste des Restaurants</Link>
                </li>
                <li>
                  <Link to="/cart">Mon Panier</Link>
                </li>
              </>
            )}
            {user?.role === "admin" && (
              <>
                <li>
                  <Link to="/restaurants">Liste des Restaurants</Link>
                </li>
                <li>
                  <Link to="/restaurateurs">Gestion des Restaurateurs</Link>
                </li>
              </>
            )}
            {user?.role === "user" && (
              <li>
                <Link to="/orders">Mes Commandes</Link>
              </li>
            )}

            {user?.role === "restaurateur" && (
              <li>
                <Link to="/manage-plats">Gérer les Plats</Link>
              </li>
            )}
            {user?.role === "restaurateur" && (
              <li>
                <Link to="/restaurant/orders">Commandes du Restaurant</Link>
              </li>
            )}

            <li>
              <button
                onClick={handleLogout}
                style={{
                  cursor: "pointer",
                  border: "none",
                  background: "none",
                }}
              >
                Se déconnecter
              </button>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul
            style={{
              display: "flex",
              listStyleType: "none",
              gap: "20px",
              margin: 0,
            }}
          >
            <li>
              <Link to="/login">Se connecter</Link>
            </li>
            <li>
              <Link to="/register">S'inscrire</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
