import { ICocktailRepository } from '@cocktail-menu-builder/application/repositories';
import { Cocktail } from '@cocktail-menu-builder/domain/entities';

export class GetCocktailsUseCase {
  public constructor(
    private readonly cocktailRepository: ICocktailRepository
  ) { }

  public async execute(ingredient: string): Promise<CocktailResult[]> {
    const cocktails = await this.cocktailRepository.get(ingredient);

    return cocktails.map(cocktail => ({
      id: cocktail.id,
      name: cocktail.name,
      price: null
    }));
  }
}

type CocktailResult = Pick<Cocktail,
  | 'id'
  | 'name'> & {
    price: null;
  };