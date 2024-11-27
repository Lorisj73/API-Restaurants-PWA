import store from "../..";
import authService from "../../../api/AuthService";
import { loginSuccess, getUserSuccess, registerSuccess } from "./authSlice";

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const { accessToken } = await authService.login(email, password);
      await dispatch(loginSuccess({ accessToken }));
      store.dispatch(getUser());
    } catch (error) {}
  };

export const getUser = () => async (dispatch) => {
  try {
    const user = await authService.getUser();
    dispatch(getUserSuccess({ user }));
  } catch (error) {}
};

export const register =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      // Étape 1 : Créer un compte utilisateur et obtenir le token
      const { accessToken, user } = await authService.register(email, password);

      // Étape 2 : Sauvegarder l'accessToken et les données utilisateur dans le store
      await dispatch(registerSuccess({ accessToken }));

      // Étape 3 : Stocker le token pour les futures requêtes
      localStorage.setItem("accessToken", accessToken);

      // Étape 4 : Récupérer les informations utilisateur
      store.dispatch(getUser());
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  };


