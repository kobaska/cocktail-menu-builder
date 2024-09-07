import { IMenuRepository } from '@cocktail-menu-builder/application/repositories';

export class RemoveCocktailFromMenuUseCase {
  public constructor(
    private readonly menuRepository: IMenuRepository
  ) { }

  public async execute(cocktailId: string): Promise<void> {
    await this.menuRepository.removeCocktail(cocktailId);;
  }
}