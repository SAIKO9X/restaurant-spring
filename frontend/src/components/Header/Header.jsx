import "../../index.css";

export const Header = () => {
  return (
    <header>
      <section className="banner -z-50 relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center">
          <p className="text-zinc-300 text-xl lg:text-4xl mb-4 font-bold font-cormorant capitalize z-10">
            Descubra novos Sabores
          </p>
          <h1 className="text-primary text-2xl lg:text-6xl font-bold font-cormorant uppercase z-10">
            A chave para uma boa refeição
          </h1>
        </div>
        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadeout"></div>
      </section>
    </header>
  );
};
