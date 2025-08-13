import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { categorizeIngredients } from "../../utils/categorizeIngredients";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../state/Cart/Action";

export const MenuCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const dispatch = useDispatch();

  const isLgUp = useMediaQuery("(min-width: 1024px)");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCheckBoxChange = (itemName) => {
    console.log(itemName);
    if (selectedIngredients.includes(itemName)) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== itemName)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, itemName]);
    }
  };

  const handleAddItemToCart = (e) => {
    e.preventDefault();

    const request = {
      foodId: item.id,
      quantity: 1,
      ingredients: selectedIngredients,
    };

    dispatch(addItemToCart(request));
    console.log("request data", request);
  };

  return (
    <div className="pb-8">
      <Accordion expanded={expanded} onChange={handleExpandClick}>
        <AccordionSummary
          expandIcon={isLgUp && <ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div>
            <div className="lg:flex items-center lg:gap-5">
              <img
                className="lg:w-28 w-full h-28 object-cover rounded"
                src={item.images[0]}
                alt="Imagem da Comida"
              />
              <div className="space-y-2 lg:pt-0 pt-2 lg:max-w-2xl">
                <p className="font-semibold text-2xl text-primary font-cormorant">
                  {item.description}
                </p>
                <p>{item.price} R$</p>
                <p className="text-zinc-400">{item.description}</p>
              </div>
            </div>
            <div className="lg:hidden mt-4">
              <Button
                color="secondary"
                variant="contained"
                onClick={handleExpandClick}
              >
                {expanded ? "Fechar" : "Expandir"}
              </Button>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleAddItemToCart}>
            <div className="flex gap-5 flex-wrap">
              {Object.keys(categorizeIngredients(item.ingredients)).map(
                (category, index) => (
                  <div key={index}>
                    <p className="font-semibold capitalize text-zinc-300">
                      {category}
                    </p>
                    <FormGroup>
                      {categorizeIngredients(item.ingredients)[category].map(
                        (ingredient) => (
                          <FormControlLabel
                            key={ingredient.id}
                            control={
                              <Checkbox size="small" color="secondary" />
                            }
                            label={ingredient.name}
                            onChange={() =>
                              handleCheckBoxChange(ingredient.name)
                            }
                            componentsProps={{
                              typography: {
                                style: { color: "#a1a1aa" },
                              },
                            }}
                          />
                        )
                      )}
                    </FormGroup>
                  </div>
                )
              )}
            </div>
            <div className="pt-5">
              <Button
                color="secondary"
                variant="contained"
                disabled={false}
                type="submit"
              >
                {true ? "Adicionar" : "Fora de estoque"}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
