import { Route, Routes } from "react-router-dom";
import { AdminSidebar } from "../components/Admin/AdminSidebar";
import { Orders } from "../components/AdminSidebar/Orders";
import { Menu } from "../components/AdminSidebar/Menu";
import { Category } from "../components/AdminSidebar/Category";
import { Ingredients } from "../components/AdminSidebar/Ingredients";
import { Details } from "../components/AdminSidebar/Details";
import { Dashboard } from "../components/Admin/Dashboard";
import { CreateMenuForm } from "../components/Menu/CreateMenuForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getRestaurantCategories } from "../state/Restaurant/Action";
import { getRestaurantsOrder } from "../state/AdminOrder/Action";
import { useMediaQuery, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { RestaurantReviews } from "../components/AdminSidebar/RestaurantReviews";
import { RestaurantChat } from "../components/AdminSidebar/RestaurantChat";

export const Admin = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store.restaurant);
  const isSmallScreen = useMediaQuery("(max-width:1080px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (restaurant?.id) {
      dispatch(getRestaurantCategories(restaurant.id));
      dispatch(getRestaurantsOrder(restaurant.id));
    }
  }, [dispatch, restaurant]);

  const handleClose = () => {
    setSidebarOpen(false);
  };

  const handleOpen = () => {
    setSidebarOpen(true);
  };

  return (
    <section className="flex">
      <AdminSidebar open={sidebarOpen} handleClose={handleClose} />

      <div
        className={`flex-grow ${
          isSmallScreen && sidebarOpen
            ? "ml-[50vw]"
            : isSmallScreen
            ? ""
            : "ml-[20vw] 2xl:ml-[15vw]"
        }`}
      >
        {isSmallScreen && !sidebarOpen && (
          <IconButton
            onClick={handleOpen}
            sx={{
              top: 10,
              left: 10,
              color: "white",
              bgcolor: "grey.800",
              "&:hover": { bgcolor: "grey.700" },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/category" element={<Category />} />
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/details" element={<Details />} />
          <Route path="/add_menu" element={<CreateMenuForm />} />
          <Route path="/reviews" element={<RestaurantReviews />} />
          <Route path="/chat" element={<RestaurantChat />} />
        </Routes>
      </div>
    </section>
  );
};
