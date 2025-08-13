import { Person, Search, ShoppingCart } from "@mui/icons-material";
import { Avatar, Badge, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const auth = useSelector((store) => store.auth);
  const cart = useSelector((store) => store.cart);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    if (auth.user?.role === "ROLE_CUSTOMER") {
      navigate("/my_profile");
    } else {
      navigate("/admin/restaurants");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#ffffff1f] bg-black py-3 lg:px-20 px-4 flex justify-between">
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li
          onClick={() => navigate("/")}
          className="logo font-cormorant text-primary font-semibold text-2xl"
        >
          Food Ordering
        </li>
      </div>

      <div className="flex items-center space-x-2 lg:space-x-10">
        <div className="cursor-pointer">
          <IconButton>
            <Search sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </div>

        <div className="cursor-pointer">
          {auth.user ? (
            <Avatar onClick={handleAvatarClick} sx={{ bgcolor: "#dcca87" }}>
              {auth.user?.fullName[0].toUpperCase()}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center">
                <Person color="primary" />
              </div>
            </IconButton>
          )}
        </div>

        <div className="cursor-pointer">
          <IconButton onClick={() => navigate("/cart")}>
            <Badge color="secondary" badgeContent={cart.cart?.items?.length}>
              <ShoppingCart sx={{ fontSize: "1.5rem" }} />
            </Badge>
          </IconButton>
        </div>
      </div>
    </nav>
  );
};
