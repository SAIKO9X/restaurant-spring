import { Route, Routes } from "react-router-dom";
import { NavBar } from "../pages/NavBar";
import { Home } from "../pages/Home";
import { Cart } from "../pages/Cart";
import { RestaurantDetails } from "../pages/RestaurantDetails";
import { Profile } from "../pages/Profile";
import { Auth } from "../components/Auth/Auth";
import { PaymentSuccess } from "../pages/PaymentSuccess";

export const CustomerRoute = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/register" element={<Home />} />
        <Route path="/account/login" element={<Home />} />
        <Route
          path="/restaurant/:city/:title/:id"
          element={<RestaurantDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my_profile/*" element={<Profile />} />
        <Route path="/payment/success/:id" element={<PaymentSuccess />} />
      </Routes>
      <Auth />
    </>
  );
};
