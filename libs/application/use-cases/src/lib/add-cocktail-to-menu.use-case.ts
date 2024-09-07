import { ICocktailRepository, IMenuRepository } from '@cocktail-menu-builder/application/repositories';
import { Cocktail } from '@cocktail-menu-builder/domain/entities';
import { CustomError } from '@cocktail-menu-builder/helpers/error-handlers';

type AddCocktailToMenuDto = {
  id: string;
  name?: string;
  price?: number;
};

export class AddCocktailToMenuUseCase {
  public constructor(
    private readonly menuRepository: IMenuRepository,
    private readonly cocktailRepository: ICocktailRepository
  ) { }

  public async execute(cocktailToUpsert: AddCocktailToMenuDto): Promise<Cocktail> {
    let persistedCocktail: Pick<Cocktail, 'id' | 'name'> | null;

    persistedCocktail = await this.cocktailRepository.find(cocktailToUpsert.id);

    if (!persistedCocktail) {
      throw new CustomError('Cocktail for provided id not found', 404);
    }

    const formattedCocktail = new Cocktail(
      cocktailToUpsert.id,
      cocktailToUpsert.name || '',
      // If price is omitted, it should remain null.
      cocktailToUpsert.price || null
    );

    // If the cocktail does not have a name, use the persisted cocktail's name
    if (!formattedCocktail.name) {
      formattedCocktail.name = persistedCocktail.name;
    }

    return this.menuRepository.addCocktail(formattedCocktail);
  }
}