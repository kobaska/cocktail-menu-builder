import { GetCocktailsUseCase } from '@cocktail-menu-builder/application/use-cases';
import { GetCocktailsReqQuery, GetCocktailsResBody } from '@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types';
import { assertString } from "@cocktail-menu-builder/helpers/assertions";
import { NextFunction, Request, Response } from "express";

export class GetCocktailsController {
  constructor(private readonly getCocktailsUseCase: GetCocktailsUseCase) { }

  public async handle(req: Request<unknown, GetCocktailsResBody, unknown, GetCocktailsReqQuery>, res: Response<GetCocktailsResBody>, next: NextFunction): Promise<void> {
    try {
      const ingredient = assertString({
        object: req.query,
        property: 'ingredient',
      });

      const cocktails = await this.getCocktailsUseCase.execute(ingredient);
      res.json(cocktails);
    } catch (error) {
      next(error);
    }
  }
}