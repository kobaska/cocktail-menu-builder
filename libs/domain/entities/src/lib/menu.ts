import { Cocktail } from "./cocktail";

export class Menu {
  constructor(
    public readonly cocktails: Cocktail[],
  ) { }
};