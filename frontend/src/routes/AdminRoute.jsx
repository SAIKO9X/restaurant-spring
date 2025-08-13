import { Route, Routes } from "react-router-dom";
import { CreateRestaurantForm } from "../components/Admin/CreateRestaurantForm";
import { Admin } from "../pages/Admin";
import { useSelector } from "react-redux";

export const AdminRoute = () => {
  const { restaurant } = useSelector((store) => store.restaurant);

  return (
    <Routes>
      <Route
        path="/*"
        element={!restaurant ? <CreateRestaurantForm /> : <Admin />}
      />
    </Routes>
  );
};
