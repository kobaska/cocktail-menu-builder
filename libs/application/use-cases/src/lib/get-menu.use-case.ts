import { IMenuRepository } from '@cocktail-menu-builder/application/repositories';
import { Menu } from '@cocktail-menu-builder/domain/entities';

export class GetMenuUseCase {
  public constructor(private readonly menuRepository: IMenuRepository) {}

  public execute(): Promise<Menu> {
    return this.menuRepository.get();
  }
}