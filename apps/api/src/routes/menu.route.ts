import { AddCocktailToMenuController, GetMenuController, RemoveCocktailFromMenuController } from '@cocktail-menu-builder/adapters/controllers';
import { ICocktailRepository, IMenuRepository } from '@cocktail-menu-builder/application/repositories';
import { AddCocktailToMenuUseCase, GetMenuUseCase, RemoveCocktailFromMenuUseCase } from '@cocktail-menu-builder/application/use-cases';
import { Router } from 'express';

export const menuRoutes = ({
  router,
  menuRepository,
  cocktailRepository
}: {
  router: Router,
  menuRepository: IMenuRepository,
  cocktailRepository: ICocktailRepository
}): void => {
  const getMenuController = new GetMenuController(
    new GetMenuUseCase(menuRepository)
  );
  router.get('/menu', (req, res, next) => getMenuController.handle(req, res, next));

  const addCocktailToMenuController = new AddCocktailToMenuController(
    new AddCocktailToMenuUseCase(
      menuRepository,
      cocktailRepository,
    )
  );
  router.post('/menu/cocktails', (req, res, next) => addCocktailToMenuController.handle(req, res, next))

  const removeCocktailFromMenuController = new RemoveCocktailFromMenuController(
    new RemoveCocktailFromMenuUseCase(
      menuRepository,
    )
  );
  router.delete('/menu/cocktails/:cocktailId', (req, res, next) => removeCocktailFromMenuController.handle(req, res, next))
}