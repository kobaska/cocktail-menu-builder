import { GetCocktailsController } from '@cocktail-menu-builder/adapters/controllers';
import { ICocktailRepository } from '@cocktail-menu-builder/application/repositories';
import { GetCocktailsUseCase } from '@cocktail-menu-builder/application/use-cases';
import { Router } from 'express';

export const cocktailsRoutes = ({
  router,
  cocktailRepository,
}: {
  router: Router,
  cocktailRepository: ICocktailRepository
}): void => {
  const getCocktailController = new GetCocktailsController(
    new GetCocktailsUseCase(cocktailRepository)
  );

  router.get('/cocktails', (req, res, next) => getCocktailController.handle(req, res, next));
}