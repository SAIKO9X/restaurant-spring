import { Card, Chip } from "@mui/material";

export const MenuCard = ({ item }) => {
  return (
    <Card className="w-72 min-h-72">
      <div className="relative">
        {item?.images?.length > 0 ? (
          <img
            className="w-full h-40 rounded-t-md object-cover"
            src={item.images[0]}
            alt={item.name}
          />
        ) : (
          <div className="w-full h-40 rounded-t-md bg-gray-200 flex items-center justify-center">
            <p>Sem imagem</p>
          </div>
        )}
        <Chip
          size="small"
          color={item.available ? "success" : "error"}
          label={item.available ? "Disponível" : "Indisponível"}
          className="absolute top-2 left-2"
        />
      </div>
      <div className="p-4">
        <p className="font-semibold text-xl font-cormorant text-primary">
          {item.name}
        </p>
        <p className="text-zinc-300 text-sm line-clamp-3">{item.description}</p>
        <p className="text-gray-500">R$ {item.price.toFixed(2)}</p>
      </div>
    </Card>
  );
};
