import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Card, Chip, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addRestaurantToFavorites } from "../../state/Authentication/Action";
import { isPresentInFavorites } from "../../config/logic";
import { useNavigate } from "react-router-dom";

export const RestaurantCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.auth.favorites);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    dispatch(addRestaurantToFavorites(item.id));
  };

  const isFavorite = isPresentInFavorites(favorites, item);

  const handleNavigateToRestaurant = () => {
    if (item.open) {
      navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
    }
  };

  return (
    <Card className="w-72 min-h-72" onClick={handleNavigateToRestaurant}>
      <div
        className={`${
          item.open ? "cursor-pointer" : "cursor-not-allowed"
        } relative`}
      >
        {item?.images?.length > 0 ? (
          <img
            className="w-full h-40 rounded-t-md object-cover"
            src={item.images[0]}
            alt="Restaurant"
          />
        ) : (
          <div className="w-full h-40 rounded-t-md bg-gray-200 flex items-center justify-center">
            <p>Sem imagem</p>
          </div>
        )}
        <Chip
          size="small"
          color={item.open ? "success" : "error"}
          label={item.open ? "aberto" : "fechado"}
          className="absolute top-2 left-2"
        />
      </div>

      <div className="p-4 text-part flex w-full justify-between">
        <div className="space-y-1 w-full">
          <div className="flex justify-between items-center ">
            <p className="font-semibold cursor-pointer text-xl font-cormorant text-primary">
              {item.name || item.title}
            </p>

            <div>
              <IconButton onClick={handleFavoriteClick}>
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </div>
          </div>
          <p className="text-zinc-300 text-sm description line-clamp-3">
            {item?.description}
          </p>
        </div>
      </div>
    </Card>
  );
};
