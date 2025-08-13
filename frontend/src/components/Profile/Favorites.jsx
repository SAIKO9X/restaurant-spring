import { useSelector } from "react-redux";
import { RestaurantCard } from "../Restaurant/RestaurantCard";

export const Favorites = () => {
  const { auth } = useSelector((store) => store);

  console.log("auth.favorites", auth.favorites);

  return (
    <section>
      <h1 className="text-2xl 2xl:text-4xl text-center text-primary py-7 font-semibold font-cormorant">
        Restaurantes Favoritados
      </h1>

      <div className="flex flex-wrap gap-1 justify-center">
        {auth.favorites.map((item) => (
          <RestaurantCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};
