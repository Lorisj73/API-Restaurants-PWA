import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const ManageRestaurateurs = () => {
  const [restaurateurs, setRestaurateurs] = useState([]);
  const [selectedRestaurateur, setSelectedRestaurateur] = useState(null);
  const [form, setForm] = useState({ login: "", email: "", password: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Récupérer la liste des restaurateurs
  const fetchRestaurateurs = async () => {
    try {
      const response = await axiosInstance.get("/users/restaurateurs");
      setRestaurateurs(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des restaurateurs :", error);
    }
  };

  // Ajouter ou modifier un restaurateur
  const handleSave = async () => {
    try {
      if (selectedRestaurateur) {
        // Modifier un restaurateur existant
        await axiosInstance.put(`/users/${selectedRestaurateur.id}`, form);
      } else {
        // Ajouter un nouveau restaurateur
        await axiosInstance.post("/users/add", { ...form, role: "restaurateur" });
      }
      setIsModalOpen(false);
      setForm({ login: "", email: "", password: "" });
      setSelectedRestaurateur(null);
      fetchRestaurateurs(); // Mettre à jour la liste
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    }
  };

  // Préparer la modification
  const handleEdit = (restaurateur) => {
    setSelectedRestaurateur(restaurateur);
    setForm({ login: restaurateur.login, email: restaurateur.email, password: "" });
    setIsModalOpen(true);
  };

  // Supprimer un restaurateur
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce restaurateur ?")) {
      try {
        await axiosInstance.delete(`/users/${id}`);
        fetchRestaurateurs(); // Mettre à jour la liste
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  useEffect(() => {
    fetchRestaurateurs();
  }, []);

  return (
    <div>
      <h2>Gestion des Restaurateurs</h2>
      <button
        onClick={() => {
          setSelectedRestaurateur(null);
          setForm({ login: "", email: "", password: "" });
          setIsModalOpen(true);
        }}
        style={{ marginBottom: "20px", padding: "10px", backgroundColor: "green", color: "white", border: "none" }}
      >
        Ajouter un restaurateur
      </button>

      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Login</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurateurs.map((restaurateur) => (
            <tr key={restaurateur.id}>
              <td>{restaurateur.login}</td>
              <td>{restaurateur.email}</td>
              <td>
                <button onClick={() => handleEdit(restaurateur)} style={{ marginRight: "10px" }}>
                  Modifier
                </button>
                <button onClick={() => handleDelete(restaurateur.id)} style={{ backgroundColor: "red", color: "white" }}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            border: "1px solid #ddd",
            zIndex: 1000,
          }}
        >
          <h3>{selectedRestaurateur ? "Modifier" : "Ajouter"} un restaurateur</h3>
          <form>
            <div style={{ marginBottom: "10px" }}>
              <label>Login :</label>
              <input
                type="text"
                value={form.login}
                onChange={(e) => setForm({ ...form, login: e.target.value })}
                required
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Email :</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Mot de passe :</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder={selectedRestaurateur ? "Laissez vide pour ne pas modifier" : "Nouveau mot de passe"}
              />
            </div>
          </form>
          <button onClick={handleSave} style={{ marginRight: "10px" }}>
            Sauvegarder
          </button>
          <button onClick={() => setIsModalOpen(false)} style={{ backgroundColor: "gray", color: "white" }}>
            Annuler
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageRestaurateurs;
