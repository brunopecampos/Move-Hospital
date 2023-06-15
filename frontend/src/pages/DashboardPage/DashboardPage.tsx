import React, { useState, useEffect } from "react";
import httpClient from "../../httpClient";
import { User } from "../../types";
import { useNavigate } from "react-router-dom";
import VerticalTabs from "../../components/TabBar/TabBar"

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

  return VerticalTabs(user)
};

export default DashboardPage;
