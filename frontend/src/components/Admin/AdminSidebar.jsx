import {
  Dashboard,
  PointOfSale,
  MenuBook,
  Fastfood,
  Egg,
  DisplaySettings,
  Logout,
  RateReview,
  Chat,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"; // Importe o useLocation
import { logout } from "../../state/Authentication/Action";

const menu = [
  { title: "Dashboard", icon: <Dashboard />, path: "/" },
  { title: "Pedidos", icon: <PointOfSale />, path: "/orders" },
  { title: "Menu", icon: <MenuBook />, path: "/menu" },
  { title: "Categoria", icon: <Fastfood />, path: "/category" },
  { title: "Ingredientes", icon: <Egg />, path: "/ingredients" },
  { title: "Avaliações", icon: <RateReview />, path: "/reviews" },
  { title: "Mensagens", icon: <Chat />, path: "/chat" },
  { title: "Detalhes", icon: <DisplaySettings />, path: "/details" },
];

export const AdminSidebar = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Hook para saber a rota atual
  const isSmallScreen = useMediaQuery("(max-width:1080px)");

  const handleNavigate = (path) => {
    navigate(`/admin/restaurants${path}`);
    if (isSmallScreen && handleClose) {
      handleClose();
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const drawerContent = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        pt: isSmallScreen ? 0 : 3,
      }}
    >
      {/* Lista de navegação principal */}
      <List sx={{ px: 2 }}>
        {menu.map((item) => {
          const isActive =
            location.pathname === `/admin/restaurants${item.path}`;
          return (
            <ListItem key={item.title} disablePadding>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                sx={{
                  borderRadius: 1,
                  mb: 1,
                  backgroundColor: isActive ? "secondary.main" : "transparent",
                  color: isActive ? "black" : "inherit",
                  "&:hover": {
                    backgroundColor: isActive
                      ? "secondary.dark"
                      : "action.hover",
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? "black" : "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Item de Logout no fundo */}
      <Box sx={{ mt: "auto", px: 2, pb: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                color: "red",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </ListItem>
      </Box>
    </Box>
  );

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
      {drawerContent}
    </Drawer>
  );
};
