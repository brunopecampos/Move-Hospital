import React, { useState, useEffect } from "react";
import httpClient from "../../httpClient";
import { User } from "../../types";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate()

  const logoutUser = async () => {
    await httpClient.post("//localhost:5000/logout");
    window.location.href = "/";
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");
        setUser(resp.data);
      } catch (error) {
        console.log("Not authenticated");
        navigate("/login")
      }
    })();
  }, []);

  return (
    <div>
      <h1>Welcome to this React Application</h1>
      {user != null ? (
        <div>
          <h2>Logged in</h2>
          <h3>ID: {user.id}</h3>
          <h3>Email: {user.email}</h3>
          <h3>User Type: {user.user_type}</h3>

          <button onClick={logoutUser}>Logout</button>
        </div>
      ) : (
        <>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
