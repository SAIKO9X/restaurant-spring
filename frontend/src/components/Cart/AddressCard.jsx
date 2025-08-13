import { Home } from "@mui/icons-material";
import { Button, Card } from "@mui/material";

export const AddressCard = ({ item, showButton, handleSelectAddress }) => {
  return (
    <Card
      variant="outlined"
      style={{ backgroundColor: "black" }}
      className="flex gap-5 w-64 p-5"
    >
      <div className="space-y-3">
        <div className="flex gap-2 text-primary">
          <Home />
          <h1 className="font-semibold text-lg">Casa</h1>
        </div>
        <p className="text-zinc-400 text-sm">
          {`${item.streetAddress}, ${item.city} - ${item.stateProvince}, ${item.postalCode}`}
        </p>
        {showButton && (
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            style={{ fontWeight: "bold" }}
            onClick={() => handleSelectAddress(item)}
          >
            Selecionar
          </Button>
        )}
      </div>
    </Card>
  );
};
