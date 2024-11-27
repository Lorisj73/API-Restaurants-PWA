import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const RestaurantOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get('/orders/restaurant/orders');
      setOrders(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes :", error);
    }
  };

  const handleUpdateStatus = async (itemId, newStatus) => {
    try {
      await axiosInstance.put(`/orders/order-item/${itemId}`, { status: newStatus });

      // Mettre à jour l'état local
      setSelectedOrder((prevOrder) => {
        if (!prevOrder) return null;

        const updatedItems = prevOrder.OrderItems.map((item) =>
          item.id === itemId ? { ...item, status: newStatus } : item
        );

        // Mettre à jour les commandes globales
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === prevOrder.id
              ? {
                  ...order,
                  status: updatedItems.every((item) => item.status === "validated") ? "completed" : order.status,
                }
              : order
          )
        );

        return { ...prevOrder, OrderItems: updatedItems };
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Commandes du Restaurant</h2>
      <div>
        {orders.map((order) => (
          <div key={order.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
            <h3>Commande #{order.id}</h3>
            <p>Status : {order.status}</p>
            <button onClick={() => setSelectedOrder(order)}>Voir les détails</button>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div style={{ marginTop: "20px", border: "1px solid #ddd", padding: "10px" }}>
          <h3>Détails de la commande #{selectedOrder.id}</h3>
          {selectedOrder.OrderItems.map((item) => (
            <div key={item.id} style={{ marginBottom: "10px" }}>
              <p>Plat : {item.Plat.nom}</p>
              <p>Quantité : {item.quantity}</p>
              <p>Status : {item.status}</p>
              {item.status === "pending" && (
                <button onClick={() => handleUpdateStatus(item.id, "validated")}>
                  Valider
                </button>
              )}
            </div>
          ))}
          <button onClick={() => setSelectedOrder(null)}>Fermer</button>
        </div>
      )}
    </div>
  );
};

export default RestaurantOrders;
