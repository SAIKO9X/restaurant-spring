import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Tab, Tabs, Typography } from "@mui/material";
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
  const { restaurant, menu } = useSelector((store) => store);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getAllRestaurants(jwt));
      dispatch(findCart(jwt));
      dispatch(getTopOrderedFoods(5));
      dispatch(getTopRatedRestaurants(5));
    }
  }, [dispatch, jwt]);

  return (
    <section className="pt-16">
      <Header />
      <div className="px-5 lg:px-20 pt-10">
        {jwt ? (
          <>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="seções da página inicial"
              >
                <Tab label="Restaurantes" />
                <Tab label="Pratos Mais Pedidos" />
                <Tab label="Melhores Avaliados" />
              </Tabs>
            </Box>

            {/* Conteúdo da Aba 0: Todos os Restaurantes */}
            {tabValue === 0 && (
              <section>
                <h1 className="text-2xl lg:text-4xl capitalize font-cormorant font-semibold text-gray-400 pb-8">
                  Peça nos restaurantes selecionados
                </h1>
                <div className="flex flex-wrap gap-4 justify-center">
                  {restaurant.restaurants.map((item) => (
                    <RestaurantCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            )}

            {/* Conteúdo da Aba 1: Pratos Mais Pedidos */}
            {tabValue === 1 && (
              <section>
                <h1 className="text-2xl lg:text-4xl capitalize font-cormorant font-semibold text-gray-400 pb-8">
                  Os pratos que todos amam
                </h1>
                <div className="flex flex-wrap gap-4 justify-center">
                  {menu.topOrderedFoods.map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            )}

            {/* Conteúdo da Aba 2: Restaurantes Mais Bem Avaliados */}
            {tabValue === 2 && (
              <section>
                <h1 className="text-2xl lg:text-4xl capitalize font-cormorant font-semibold text-gray-400 pb-8">
                  Os favoritos da comunidade
                </h1>
                <div className="flex flex-wrap gap-4 justify-center">
                  {restaurant.topRated.map((item) => (
                    <RestaurantCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="h-screen flex items-center justify-center">
            <Typography variant="h4" className="font-cormorant text-gray-400">
              Faça login para descobrir os melhores sabores.
            </Typography>
          </div>
        )}
      </div>
    </section>
  );
};
