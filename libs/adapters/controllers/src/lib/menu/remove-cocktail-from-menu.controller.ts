import { RemoveCocktailFromMenuUseCase } from '@cocktail-menu-builder/application/use-cases';
import { DeleteMenuCocktailReqParams, PostMenuCocktailResBody } from '@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types';
import { assertString } from "@cocktail-menu-builder/helpers/assertions";
import { NextFunction, Request, Response } from "express";

export class RemoveCocktailFromMenuController {
  constructor(private readonly removeCocktailFromMenuUseCase: RemoveCocktailFromMenuUseCase) { }

  public async handle(req: Request<DeleteMenuCocktailReqParams>, res: Response, next: NextFunction): Promise<void> {
    try {
      const cocktailId = assertString({
        object: req.params,
        property: 'cocktailId',
      });

      await this.removeCocktailFromMenuUseCase.execute(cocktailId);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}