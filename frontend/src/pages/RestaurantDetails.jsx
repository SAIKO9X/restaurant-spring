import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Button,
  Box,
  Rating,
} from "@mui/material";
import { LocationOn, Today } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { MenuCard } from "../components/Restaurant/MenuCard";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantById,
  getRestaurantCategories,
} from "../state/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "../state/Menu/Action";
import { getRestaurantReviews, submitReview } from "../state/Review/Action";
import { ReviewCard } from "../components/Restaurant/ReviewCard";
import { ChatModal } from "../components/Chat/ChatModal";

const foodTypes = [
  { label: "Todas", value: "all" },
  { label: "Vegetariana", value: "vegetarian" },
  { label: "Não Vegetariana", value: "no_vegetarian" },
  { label: "De Temporada", value: "seasonal" },
];

export const RestaurantDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [foodType, setFoodType] = useState("all");
  const [openChat, setOpenChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const { restaurant, menu, review, auth } = useSelector((store) => store);

  const handleOpenChat = async () => {
    try {
      const chat = await dispatch(createChat(id));
      setSelectedChat(chat);
      setOpenChat(true);
    } catch (error) {
      console.error("Failed to create or open chat", error);
    }
  };

  const [filters, setFilters] = useState({
    vegetarian: false,
    noVegetarian: false,
    seasonal: false,
    food_category: "all",
  });

  const handleFoodTypeChange = (e) => {
    const value = e.target.value;
    setFoodType(value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      vegetarian: value === "vegetarian",
      noVegetarian: value === "no_vegetarian",
      seasonal: value === "seasonal",
      food_category: prevFilters.food_category,
    }));
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      food_category: category,
    }));
  };

  useEffect(() => {
    dispatch(getRestaurantById({ restaurantId: id }));
    dispatch(getRestaurantCategories(id));
    dispatch(getMenuItemsByRestaurantId(id, filters));
    dispatch(getRestaurantReviews(id));
  }, [dispatch, id, filters]);

  return (
    <section className="px-5 lg:px-20 pt-20">
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <img
              className="w-full h-[40vh] object-cover"
              src={restaurant.restaurant?.images[0]}
              alt="Restaurant Image"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <img
              className="w-full h-[40vh] object-cover"
              src={restaurant.restaurant?.images[1]}
              alt="Restaurant Image"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <img
              className="w-full h-[40vh] object-cover"
              src={restaurant.restaurant?.images[2]}
              alt="Restaurant Image"
            />
          </Grid>
        </Grid>
      </div>

      <div className="py-4 space-y-4">
        <h2 className="text-4xl mt-2 text-primary font-semibold font-cormorant">
          {restaurant.restaurant?.name}
        </h2>
        <p className="text-zinc-300">{restaurant.restaurant?.description}</p>
        <p className="text-zinc-500 flex items-center gap-3">
          <LocationOn />
          <span>
            {restaurant.restaurant?.address.streetAddress},{" "}
            {restaurant.restaurant?.address.city}
          </span>
        </p>
        <p className="text-zinc-500 flex items-center gap-3">
          <Today />
          <span>{restaurant.restaurant?.openingHours}</span>
        </p>

        <Button
          variant="outlined"
          color="secondary"
          onClick={handleOpenChat}
          startIcon={<Chat />}
        >
          Iniciar Chat com o Restaurante
        </Button>
      </div>

      <Divider />

      <div className="pt-8 lg:flex relative">
        <div className="space-y-10 lg:w-1/5 filter">
          <div className="box space-y-5 lg:sticky top-28 p-5 shadow-md">
            <div>
              <h3 className="text-2xl font-cormorant text-primary font-semibold mb-4">
                Tipo de Comida
              </h3>

              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup
                  onChange={handleFoodTypeChange}
                  name="food_type"
                  value={foodType}
                >
                  {foodTypes.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      control={<Radio color="secondary" />}
                      label={item.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>

            <Divider />

            <div>
              <h3 className="text-2xl font-cormorant text-primary font-semibold mb-4">
                Categoria de Comida
              </h3>

              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup
                  onChange={handleCategoryChange}
                  name="food_category"
                  value={filters.food_category}
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio color="secondary" />}
                    label="Todas"
                  />
                  {restaurant.categories.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      value={item.name}
                      control={<Radio color="secondary" />}
                      label={item.name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>

        <div className="space-y-5 lg:w-4/5 lg:pl-10">
          {menu.menuItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      <Divider sx={{ my: 4 }} />

      <section>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 2, fontFamily: "Cormorant Upright", color: "primary.main" }}
        >
          Avaliações e Comentários
        </Typography>

        {/* Formulário para Nova Avaliação */}
        {auth.user && (
          <Box component="form" onSubmit={handleReviewSubmit} sx={{ mb: 4 }}>
            <Typography variant="h6">Deixe a sua avaliação</Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Escreva o seu comentário..."
              variant="outlined"
              color="secondary"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              sx={{ my: 2 }}
            />
            <Button type="submit" variant="contained" color="secondary">
              Enviar Avaliação
            </Button>
          </Box>
        )}

        {/* Lista de Avaliações */}
        {review.reviews.map((item) => (
          <ReviewCard key={item.id} review={item} />
        ))}
      </section>

      <ChatModal
        open={openChat}
        handleClose={() => setOpenChat(false)}
        chat={selectedChat}
      />
    </section>
  );
};
