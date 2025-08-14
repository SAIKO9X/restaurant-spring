import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Modal,
  TextField,
  Typography,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { searchAll } from "../../state/Search/Action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const SearchModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { results, loading } = useSelector((store) => store.search);
  const [searchTerm, setSearchTerm] = useState("");

  // Hook para fazer a busca com um pequeno atraso (debounce)
  useEffect(() => {
    if (searchTerm) {
      const delayDebounceFn = setTimeout(() => {
        dispatch(searchAll(searchTerm));
      }, 500); // espera 500ms após o usuário parar de digitar

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm, dispatch]);

  const handleNavigate = (path) => {
    handleClose();
    navigate(path);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <TextField
          fullWidth
          label="Pesquisar por restaurante ou prato..."
          variant="outlined"
          color="secondary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading && <CircularProgress sx={{ mt: 2 }} />}

        {searchTerm && !loading && (
          <Box sx={{ mt: 2 }}>
            {/* Restaurantes */}
            {results.restaurants?.length > 0 && (
              <>
                <Typography variant="h6">Restaurantes</Typography>
                <List>
                  {results.restaurants.map((item) => (
                    <ListItem
                      button
                      key={item.id}
                      onClick={() =>
                        handleNavigate(
                          `/restaurant/${item.address.city}/${item.name}/${item.id}`
                        )
                      }
                    >
                      <ListItemAvatar>
                        <Avatar src={item.images[0]} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={item.cuisineType}
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider />
              </>
            )}

            {/* Comidas */}
            {results.foods?.length > 0 && (
              <>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Pratos
                </Typography>
                <List>
                  {results.foods.map((item) => (
                    <ListItem
                      button
                      key={item.id}
                      onClick={() =>
                        handleNavigate(
                          `/restaurant/${item.restaurant.name}/${item.restaurant.name}/${item.restaurant.id}`
                        )
                      }
                    >
                      <ListItemAvatar>
                        <Avatar src={item.images[0]} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={item.restaurant.name}
                      />
                    </ListItem>
                  ))}
                </List>
              </>
            )}
          </Box>
        )}
      </Box>
    </Modal>
  );
};
