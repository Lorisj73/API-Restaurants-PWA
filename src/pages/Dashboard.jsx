import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/features/auth/authSlice";
import { Link } from "react-router-dom";


const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(token, user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <div>
        <h2>Hello {user?.email}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div>
        <h2>Dashboard</h2>
        <Link to="/restaurants">Voir les Restaurants</Link>
      </div>
    </div>
  );
};

export default Dashboard;
