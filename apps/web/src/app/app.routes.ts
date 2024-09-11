import { Route } from '@angular/router';
import { CocktailMenuComponent } from './pages/cocktail-menu/cocktail-menu.component';
import { CocktailMenuAddComponent } from './pages/cocktail-menu-add/cocktail-menu-add.component';

export const appRoutes: Route[] = [
  {
    path: 'menu',
    component: CocktailMenuComponent,
  },
  {
    path: 'add-cocktail',
    component: CocktailMenuAddComponent,
  },
  {
    path: '**',
    redirectTo: 'menu',
  },
];
