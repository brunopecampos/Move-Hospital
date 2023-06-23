import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFound from "./pages/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={NotFound} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
