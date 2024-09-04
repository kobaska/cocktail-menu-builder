import { TheCocktailDBDrink } from "./types";

export function tranformCocktailToEntityModel(cocktail: TheCocktailDBDrink) {
    return {
      id: cocktail.idDrink,
      name: cocktail.strDrink,
      price: null
    };
}