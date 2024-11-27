import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Restaurants from "./pages/Restaurants";
import RestaurantPlats from "./pages/RestaurantPlats";
import Header from "./components/header";
import Cart from "./pages/Cart";
import Orders from "./pages/order";
import OrderDetails from "./pages/orderDetails";
import RestaurantManagePlats from "./pages/RestaurantManagePlats";
import RestaurantOrders from "./pages/RestaurantOrders";
import ManageRestaurateurs from "./pages/ManageRestaurateurs";
import Unauthorized from "./pages/Unauthorized";


const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Vérifie si l'utilisateur a l'un des rôles autorisés
  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" />; // Redirige vers le tableau de bord ou autre page par défaut
  }

  return children;
};


const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <Header />
      <Routes>
        {/* Connexion */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
        />

        {/* Inscription */}
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />}
        />

        {/* Tableau de bord (accessible à tous les utilisateurs connectés) */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Gestion des restaurateurs (admin uniquement) */}
        <Route
          path="/restaurateurs"
          element={
            <RoleProtectedRoute allowedRoles={["admin"]}>
              <ManageRestaurateurs />
            </RoleProtectedRoute>
          }
        />

        {/* Liste des restaurants (admin et restaurateurs) */}
        <Route
          path="/restaurants"
          element={
            <RoleProtectedRoute allowedRoles={["admin", "restaurateur"]}>
              <Restaurants />
            </RoleProtectedRoute>
          }
        />

        {/* Plats d'un restaurant (accessible à tous les utilisateurs connectés) */}
        <Route
          path="/restaurant/:id/plats"
          element={
            isAuthenticated ? <RestaurantPlats /> : <Navigate to="/login" />
          }
        />

        {/* Commandes d'un restaurant (restaurateurs uniquement) */}
        <Route
          path="/restaurant/orders"
          element={
            <RoleProtectedRoute allowedRoles={["restaurateur"]}>
              <RestaurantOrders />
            </RoleProtectedRoute>
          }
        />

        {/* Panier (utilisateurs uniquement) */}
        <Route
          path="/cart"
          element={
            <RoleProtectedRoute allowedRoles={["user"]}>
              <Cart />
            </RoleProtectedRoute>
          }
        />

        {/* Commandes de l'utilisateur (utilisateurs uniquement) */}
        <Route
          path="/orders"
          element={
            <RoleProtectedRoute allowedRoles={["user"]}>
              <Orders />
            </RoleProtectedRoute>
          }
        />

        {/* Détails d'une commande (utilisateurs uniquement) */}
        <Route
          path="/orders/:id"
          element={
            <RoleProtectedRoute allowedRoles={["user"]}>
              <OrderDetails />
            </RoleProtectedRoute>
          }
        />

        {/* Gestion des plats d'un restaurant (restaurateurs uniquement) */}
        <Route
          path="/manage-plats"
          element={
            <RoleProtectedRoute allowedRoles={["restaurateur"]}>
              <RestaurantManagePlats />
            </RoleProtectedRoute>
          }
        />

        {/* Route par défaut */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
      <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>

    </Router>
  );
};

export default App;
