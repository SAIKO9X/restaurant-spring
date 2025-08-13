import {
  AccountBalance,
  Favorite,
  Home,
  Logout,
  NotificationsActive,
  ShoppingBag,
} from "@mui/icons-material";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../state/Authentication/Action";

const menu = [
  { title: "Pedidos", icon: <ShoppingBag /> },
  { title: "Favoritos", icon: <Favorite /> },
  { title: "Endereços", icon: <Home /> },
  { title: "Pagamentos", icon: <AccountBalance /> },
  { title: "Notificações", icon: <NotificationsActive /> },
  { title: "Sair", icon: <Logout /> },
];

export const ProfileNavigation = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSmallScreen = useMediaQuery("(max-width:1080px)");

  const handleNavigate = (item) => {
    console.log("Item Title" + item.title);
    if (item.title === "Sair") {
      dispatch(logout());
      navigate("/");
    } else navigate(`/my_profile/${item.title.toLowerCase()}`);
  };

  return (
    <div>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={open}
        onClose={handleClose}
        anchor="left"
        sx={{
          zIndex: 1,
        }}
      >
        <div className="w-[50vw] lg:w-[20vw] 2xl:w-[12vw] h-screen text-zinc-300 gap-8 flex flex-col pt-24">
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
              <Divider />
            </Fragment>
          ))}
        </div>
      </Drawer>
    </div>
  );
};
