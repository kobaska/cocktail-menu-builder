import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CocktailMenuBuildApiService } from '../../services/cocktail-menu-build-api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GetMenuResBody } from '@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types';
import { take } from 'rxjs';
import { RouterModule } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-cocktail-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cocktail-menu.component.html',
  styleUrl: './cocktail-menu.component.scss',
})
export class CocktailMenuComponent {
  protected readonly loading = signal<boolean>(true);
  protected readonly printing = signal<boolean>(false);
  protected readonly menu = signal<GetMenuResBody>({
    cocktails: [],
  });

  constructor(
    private readonly cocktailMenuBuildApiService: CocktailMenuBuildApiService
  ) {}

  ngOnInit() {
    this.cocktailMenuBuildApiService
      .getMenu$()
      .pipe(untilDestroyed(this))
      .subscribe((menu) => {
        this.loading.set(false);
        this.menu.set(menu);
      });

    window.onafterprint = () => this.printing.set(false);
  }

  protected removeFromMenu(cocktailId: string) {
    this.loading.set(true);
    this.cocktailMenuBuildApiService
      .deleteMenuCocktail$(cocktailId)
      .pipe(take(1))
      .subscribe();
  }

  protected printMenu() {
    this.printing.set(true);

    // Delay cycle to update the UI
    setTimeout(() => window.print());
  }
}
