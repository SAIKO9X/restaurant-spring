import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
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

const foodTypes = [
  { label: "Todas", value: "all" },
  { label: "Vegetariana", value: "vegetarian" },
  { label: "Não Vegetariana", value: "no_vegetarian" },
  { label: "De Temporada", value: "seasonal" },
];

export const RestaurantDetails = () => {
  const [foodType, setFoodType] = useState("all");
  const dispatch = useDispatch();
  const { restaurant, menu } = useSelector((store) => store);
  const { id } = useParams();

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
    </section>
  );
};
