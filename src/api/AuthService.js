import axiosInstance from "./axiosInstance";

class AuthService {
  async login(email, password) {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data; // Doit contenir `accessToken` et `userId` ou `user` avec l'ID inclus
  }

  async getUser() {
    const response = await axiosInstance.get("/users/me"); // Utilise la nouvelle route pour récupérer les informations de l'utilisateur
    return response.data;
  }

  async register(email, password) {
    // Extraire la partie avant le '@' pour générer automatiquement le login
    const login = email.split("@")[0];
  
    const response = await axiosInstance.post("/users/add", {
      email,
      password,
      login,
      role: "user",
    });
    return response.data;
  }
  
}

export default new AuthService();
