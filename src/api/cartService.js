import axiosInstance from "./axiosInstance";

// Récupérer le panier
export const getCart = async () => {
  const response = await axiosInstance.get("/cart");
  return response.data;
};

// Ajouter un plat au panier
export const addToCart = async (platId, quantity) => {
  const response = await axiosInstance.post("/cart/add", { platId, quantity });
  return response.data;
};

// Vider le panier
export const clearCart = async () => {
  const response = await axiosInstance.delete("/cart/clear");
  return response.data;
};

// Réduire la quantité d'un plat
export const decreaseQuantity = async (platId) => {
  const response = await axiosInstance.patch("/cart/decrease", { platId });
  return response.data;
};

// Supprimer un plat du panier
export const removeFromCart = async (platId) => {
  const response = await axiosInstance.delete("/cart/remove", { data: { platId } });
  return response.data;
};

// Valider une commande
export const validateOrder = async () => {
    const response = await axiosInstance.post('/orders');
    return response.data;
  };


// Récupérer toutes les commandes de l'utilisateur
export const getOrders = async () => {
    const response = await axiosInstance.get('/orders');
    return response.data;
  };
  
  // Récupérer les détails d'une commande
  export const getOrderDetails = async (orderId) => {
    const response = await axiosInstance.get(`/orders/${orderId}`);
    return response.data;
  };