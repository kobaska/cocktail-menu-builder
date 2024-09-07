import { Router } from 'express';
import { menuRoutes } from './menu.route';
import { cocktailsRoutes } from './cocktails.route';
import { InMemoryCocktailRepository, InMemoryMenuRepository, S3MenuRepository, TheCocktailDBCocktailRepository } from '@cocktail-menu-builder/adapters/gateways';

export function setupRoutes(router: Router): void {
  const menuRepositories = {
    'in-memory': new InMemoryMenuRepository(),
    s3: new S3MenuRepository(),
  };

  const cocktailRepositories = {
    'in-memory': new InMemoryCocktailRepository(),
    thecocktaildb: new TheCocktailDBCocktailRepository(),
  };

  menuRoutes({
    router,
    menuRepository: menuRepositories[process.env.MENU_DB],
    cocktailRepository: cocktailRepositories[process.env.COCKTAIL_DB],
  });

  cocktailsRoutes({
    router,
    cocktailRepository: cocktailRepositories[process.env.COCKTAIL_DB],
  });
}