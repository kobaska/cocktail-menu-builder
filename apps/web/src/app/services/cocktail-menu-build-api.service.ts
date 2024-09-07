import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  GetCocktailsReqQuery,
  GetCocktailsResBody,
  GetMenuResBody,
  PostMenuCocktailReqBody,
  PostMenuCocktailResBody,
} from '@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CocktailMenuBuildApiService {
  private readonly CocktailMenuBuilderAPIUrl =
    'https://don58np229.execute-api.ap-southeast-2.amazonaws.com/production';
  private readonly TheCocktailDBAPIUrl =
    'https://www.thecocktaildb.com/api/json/v1/1';
  private refresh$: BehaviorSubject<null> = new BehaviorSubject(null);

  constructor(private readonly httpClient: HttpClient) {}

  getMenu$(): Observable<GetMenuResBody> {
    return this.refresh$
      .asObservable()
      .pipe(switchMap(() => this.fetchMenu$()));
  }

  private fetchMenu$(): Observable<GetMenuResBody> {
    return this.httpClient
      .get<GetMenuResBody>(`${this.CocktailMenuBuilderAPIUrl}/menu`)
      .pipe(
        catchError((error) => {
          alert('Sorry. Something went wrong.');

          return throwError(() => error);
        })
      );
  }

  fetchCocktails$(
    query: GetCocktailsReqQuery
  ): Observable<GetCocktailsResBody> {
    return this.httpClient
      .get<GetCocktailsResBody>(
        `${this.CocktailMenuBuilderAPIUrl}/cocktails?${new URLSearchParams(
          query
        ).toString()}`
      )
      .pipe(
        catchError((error) => {
          alert('Sorry. Something went wrong.');

          return throwError(() => error);
        })
      );
  }

  addCocktailToMenu$(
    body: PostMenuCocktailReqBody
  ): Observable<PostMenuCocktailResBody> {
    return this.httpClient
      .post<PostMenuCocktailResBody>(
        `${this.CocktailMenuBuilderAPIUrl}/menu/cocktails`,
        body
      )
      .pipe(
        tap(() => this.refresh$.next(null)),
        catchError((error) => {
          alert('Sorry. Something went wrong.');

          return throwError(() => error);
        })
      );
  }

  deleteMenuCocktail$(cocktailId: string): Observable<void> {
    return this.httpClient
      .delete<void>(
        `${this.CocktailMenuBuilderAPIUrl}/menu/cocktails/${cocktailId}`
      )
      .pipe(
        tap(() => this.refresh$.next(null)),
        catchError((error) => {
          alert('Sorry. Something went wrong.');

          return throwError(() => error);
        })
      );
  }

  getIngredients$(): Observable<string[]> {
    return this.httpClient
      .get<{
        drinks: {
          strIngredient1: string;
        }[];
      }>(`${this.TheCocktailDBAPIUrl}/list.php?i=list`)
      .pipe(
        map((response) => response.drinks.map((drink) => drink.strIngredient1)),
        catchError((error) => {
          alert('Sorry. Something went wrong.');

          return throwError(() => error);
        })
      );
  }
}
