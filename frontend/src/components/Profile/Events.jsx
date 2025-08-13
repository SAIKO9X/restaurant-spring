import { EventCard } from "./EventCard";

export const Events = () => {
  return (
    <section className="mt-5 px-5 flex flex-wrap gap-5">
      {[1, 1, 1].map((item, index) => (
        <EventCard key={index} />
      ))}
    </section>
  );
};
