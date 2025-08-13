import {
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState } from "react";
import { OrderTable } from "./OrderTable";

const orderStatus = [
  { label: "Pendente", value: "PENDING" },
  { label: "A Caminho", value: "OUT_FOR_DELIVERY" },
  { label: "Entregue", value: "DELIVERED" },
  { label: "Cancelado", value: "CANCELLED" },
  { label: "Todos", value: "ALL" },
];

export const Orders = () => {
  const [filterValue, setFilterValue] = useState("ALL");

  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <section className="px-2 ">
      <Card className="p-5 my-4">
        <h1 className="pb-4 capitalize font-cormorant font-bold text-2xl text-primary">
          status do pedido
        </h1>

        <FormControl>
          <RadioGroup
            row
            name="category"
            value={filterValue}
            onChange={handleFilter}
          >
            {orderStatus.map((item) => (
              <FormControlLabel
                key={item.value}
                value={item.value}
                control={<Radio color="secondary" />}
                label={item.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Card>
      <OrderTable filterValue={filterValue} />
    </section>
  );
};
