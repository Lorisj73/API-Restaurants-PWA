import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderDetails } from '../api/cartService';

const OrderDetails = () => {
  const { id } = useParams(); // ID de la commande
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await getOrderDetails(id);
        setOrder(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la commande :", error);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (!order) {
    return <p>Chargement des détails de la commande...</p>;
  }

  return (
    <div>
      <h2>Détails de la Commande</h2>
      <p>Commande ID : {order.id}</p>
      <p>Date : {new Date(order.createdAt).toLocaleDateString()}</p>
      <p>Status : {order.status}</p>
      <h3>Produits :</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {order.OrderItems.map((item) => (
          <li
            key={item.id}
            style={{
              border: '1px solid #ddd',
              margin: '10px 0',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            <p>Plat : {item.Plat.nom}</p>
            <p>Quantité : {item.quantity}</p>
            <p>Prix unitaire : {item.Plat.prixUnitaire} €</p>
            <p>Total : {(item.quantity * item.Plat.prixUnitaire).toFixed(2)} €</p>
          </li>
        ))}
      </ul>
      <h3>
        Coût total :{' '}
        <strong>
          {order.OrderItems.reduce(
            (acc, item) => acc + item.quantity * item.Plat.prixUnitaire,
            0
          ).toFixed(2)}{' '}
          €
        </strong>
      </h3>
    </div>
  );
};

export default OrderDetails;
