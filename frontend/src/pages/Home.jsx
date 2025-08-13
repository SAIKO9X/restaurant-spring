import { Header } from "../components/Header/Header";
import { RestaurantCard } from "../components/Restaurant/RestaurantCard";
import { MenuCard } from "../components/Restaurant/MenuCard"; // Importe o novo componente
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllRestaurants } from "../state/Restaurant/Action";
import { findCart } from "../state/Cart/Action";
import { getTopOrderedFoods } from "../state/Menu/Action";

export const Home = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurants } = useSelector((store) => store.restaurant);
  const { topOrderedFoods, loadingTopOrdered, errorTopOrdered } = useSelector(
    (store) => store.menu
  );

  useEffect(() => {
    if (jwt) {
      dispatch(getAllRestaurants(jwt));
      dispatch(findCart(jwt));
      dispatch(getTopOrderedFoods(5));
    }
  }, [dispatch, jwt]);

  return (
    <section className="pt-16">
      <Header />
      <div className="flex flex-col justify-evenly h-screen">
        {jwt ? (
          <>
            <section className="px-5 lg:px-20 pt-10">
              <h1 className="text-2xl lg:text-4xl capitalize font-cormorant font-semibold text-gray-400 pb-8">
                Pratos mais pedidos
              </h1>
              {loadingTopOrdered ? (
                <p>Carregando...</p>
              ) : errorTopOrdered ? (
                <p>Erro ao carregar pratos: {errorTopOrdered}</p>
              ) : topOrderedFoods.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {topOrderedFoods.map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <p>Nenhum prato em destaque no momento.</p>
              )}
            </section>

            <section className="px-5 lg:px-20 pt-10">
              <h1 className="text-2xl lg:text-4xl capitalize font-cormorant font-semibold text-gray-400 pb-8">
                Peça nos restaurantes selecionados
              </h1>
              <div className="flex flex-wrap gap-4">
                {restaurants.map((item) => (
                  <RestaurantCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          </>
        ) : (
          <p className="text-2xl lg:text-4xl font-cormorant text-center font-semibold text-gray-400 pt-[25%]">
            Faça login para acessar nossos restaurantes.
          </p>
        )}
      </div>
    </section>
  );
};
