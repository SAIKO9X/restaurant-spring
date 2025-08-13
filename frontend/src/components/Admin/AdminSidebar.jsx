import {
  Close,
  Dashboard,
  DisplaySettings,
  Egg,
  Fastfood,
  Logout,
  MenuBook,
  PointOfSale,
} from "@mui/icons-material";
import { Divider, Drawer, useMediaQuery, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../state/Authentication/Action";
import { Fragment } from "react";

const menu = [
  { title: "Dashboard", icon: <Dashboard />, path: "/" },
  { title: "Pedidos", icon: <PointOfSale />, path: "/orders" },
  { title: "Menu", icon: <MenuBook />, path: "/menu" },
  { title: "Categoria", icon: <Fastfood />, path: "/category" },
  { title: "Ingredientes", icon: <Egg />, path: "/ingredients" },
  { title: "Detalhes", icon: <DisplaySettings />, path: "/details" },
  { title: "Sair", icon: <Logout />, path: "/" },
];

export const AdminSidebar = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(max-width:1080px)");

  const handleNavigate = (item) => {
    if (item.title === "Sair") {
      dispatch(logout());
      navigate("/");
    } else {
      navigate(`/admin/restaurants${item.path}`);
    }
    if (isSmallScreen && handleClose) {
      handleClose();
    }
  };

  return (
    <Drawer
      variant={isSmallScreen ? "temporary" : "permanent"}
      open={isSmallScreen ? open : true}
      onClose={handleClose}
      anchor="left"
      sx={{
        zIndex: 1,
        "& .MuiDrawer-paper": {
          width: isSmallScreen ? "50vw" : "15vw",
          boxSizing: "border-box",
        },
      }}
    >
      <div>
        {isSmallScreen && (
          <div className="flex justify-end pr-2 pb-2">
            <IconButton onClick={handleClose} sx={{ color: "white" }}>
              <Close />
            </IconButton>
          </div>
        )}

        <div className="h-screen text-zinc-300 gap-8 flex flex-col lg:pt-10 pt-0">
          {menu.map((item, index) => (
            <Fragment key={index}>
              <div
                onClick={() => handleNavigate(item)}
                className={`flex items-center px-5 space-x-5 cursor-pointer transition ${
                  index === menu.length - 1
                    ? "mt-auto hover:text-red-500 font-semibold"
                    : "hover:text-zinc-500"
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
              <Divider sx={{ bgcolor: "gray" }} />
            </Fragment>
          ))}
        </div>
      </div>
    </Drawer>
  );
};
