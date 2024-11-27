import React, { useEffect, useState } from 'react';
import { getOrders } from '../api/cartService';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
      }
    };

    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return <p>Vous n'avez aucune commande.</p>;
  }

  return (
    <div>
      <h2>Mes Commandes</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {orders.map((order) => (
          <li
            key={order.id}
            style={{
              border: '1px solid #ddd',
              margin: '10px 0',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            <p>Commande ID : {order.id}</p>
            <p>Date : {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Status : {order.status}</p>
            <Link to={`/orders/${order.id}`} style={{ color: 'blue' }}>
              Voir les détails
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
