import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GetCocktailsResBody } from '@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types';
import { Cocktail } from '@cocktail-menu-builder/domain/entities/cocktail';
import { take } from 'rxjs';
import { CocktailMenuBuildApiService } from '../../services/cocktail-menu-build-api.service';

@Component({
  selector: 'app-cocktail-menu-add',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cocktail-menu-add.component.html',
  styleUrl: './cocktail-menu-add.component.scss',
})
export class CocktailMenuAddComponent {
  protected readonly ingredients = signal<string[]>([]);
  protected readonly cocktails = signal<GetCocktailsResBody>([]);
  protected readonly loading = signal<boolean>(true);
  protected selectedIngredient = '';

  constructor(
    private readonly cocktailMenuBuildApiService: CocktailMenuBuildApiService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.cocktailMenuBuildApiService.getIngredients$()
    .pipe(
      take(1),
    )
    .subscribe(ingredients => {
      this.loading.set(false);
      this.ingredients.set(ingredients);
      this.selectedIngredient = ingredients[0];
      this.selectIngredient(this.selectedIngredient);
    });
  }

  protected selectIngredient(ingredient: string) {
    this.loading.set(true);
    this.cocktailMenuBuildApiService.fetchCocktails$({ ingredient })
    .pipe(
      take(1),
    ).subscribe(cocktails => {
      this.cocktails.set(cocktails);
      this.loading.set(false);
    });
  }

  protected addCocktail(cocktail: Cocktail) {
    this.loading.set(true);
    this.cocktailMenuBuildApiService.addCocktailToMenu$({
      id: cocktail.id,
      name: cocktail.name,
      price: cocktail.price || undefined,
    })
    .pipe(
      take(1),
    ).subscribe(() => {
      this.loading.set(false);
      alert('Cocktail added to menu');
    });
  }
}
