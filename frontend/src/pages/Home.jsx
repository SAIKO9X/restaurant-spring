import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Divider } from "@mui/material";
import { Header } from "../components/Header/Header";
import { RestaurantCard } from "../components/Restaurant/RestaurantCard";
import { MenuCard } from "../components/Menu/MenuCard";
import {
  getAllRestaurants,
  getTopRatedRestaurants,
} from "../state/Restaurant/Action";
import { findCart } from "../state/Cart/Action";
import { getTopOrderedFoods } from "../state/Menu/Action";

export const Home = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, menu, auth } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) {
      dispatch(getAllRestaurants(jwt));
      dispatch(findCart(jwt));
      dispatch(getTopOrderedFoods(5));
      dispatch(getTopRatedRestaurants(5));
    }
  }, [dispatch, jwt]);

  return (
    <Box className="pt-16">
      <Header />
      <Box className="px-5 lg:px-20 pt-10">
        {auth.user ? (
          <Box className="space-y-12 pb-10">
            {/* Secção: Restaurantes Mais Bem Avaliados */}
            <section>
              <Typography
                variant="h4"
                className="capitalize font-cormorant font-semibold text-gray-400 pb-8"
              >
                Os Favoritos da Comunidade
              </Typography>
              <Box className="flex flex-wrap gap-4 justify-center">
                {restaurant.topRated?.length > 0 ? (
                  restaurant.topRated.map((item) => (
                    <RestaurantCard key={item.id} item={item} />
                  ))
                ) : (
                  <Typography color="text.secondary">
                    Ainda não há restaurantes bem avaliados para mostrar.
                  </Typography>
                )}
              </Box>
            </section>

            <Divider />

            {/* Secção: Pratos Mais Pedidos */}
            <section>
              <Typography
                variant="h4"
                className="capitalize font-cormorant font-semibold text-gray-400 pb-8"
              >
                Os Pratos que Todos Amam
              </Typography>
              <Box className="flex flex-wrap gap-4 justify-center">
                {menu.topOrderedFoods?.length > 0 ? (
                  menu.topOrderedFoods.map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))
                ) : (
                  <Typography color="text.secondary">
                    Assim que os pedidos começarem, os pratos mais populares
                    aparecerão aqui.
                  </Typography>
                )}
              </Box>
            </section>

            <Divider />

            {/* Secção: Todos os Restaurantes */}
            <section>
              <Typography
                variant="h4"
                className="capitalize font-cormorant font-semibold text-gray-400 pb-8"
              >
                Peça nos Nossos Restaurantes
              </Typography>
              <Box className="flex flex-wrap gap-4 justify-center">
                {restaurant.restaurants?.length > 0 ? (
                  restaurant.restaurants.map((item) => (
                    <RestaurantCard key={item.id} item={item} />
                  ))
                ) : (
                  <Typography color="text.secondary">
                    Nenhum restaurante disponível no momento.
                  </Typography>
                )}
              </Box>
            </section>
          </Box>
        ) : (
          <Box className="h-screen flex items-center justify-center">
            <Typography variant="h4" className="font-cormorant text-gray-400">
              Faça login para descobrir os melhores sabores.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
