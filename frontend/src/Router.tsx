import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/DashboardPage/DashboardPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFound from "./pages/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={NotFound} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
