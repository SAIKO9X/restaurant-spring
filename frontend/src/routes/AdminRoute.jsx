import { Route, Routes } from "react-router-dom";
import { CreateRestaurantForm } from "../components/Admin/CreateRestaurantForm";
import { Admin } from "../pages/Admin";
import { useSelector } from "react-redux";
import { AdminDashboard } from "../components/Admin/AdminDashboard";

export const AdminRoute = () => {
  const { restaurant } = useSelector((store) => store.restaurant);
  const { auth } = useSelector((store) => store);

  // Se for ADMIN, mostra a dashboard de Admin
  if (auth.user?.role === "ROLE_ADMIN") {
    return (
      <Routes>
        <Route path="/*" element={<AdminDashboard />} />
      </Routes>
    );
  }

  // Se for RESTAURANT_OWNER
  return (
    <Routes>
      <Route
        path="/*"
        element={!restaurant ? <CreateRestaurantForm /> : <Admin />}
      />
    </Routes>
  );
};
