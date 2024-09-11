import { AddCocktailToMenuUseCase } from '@cocktail-menu-builder/application/use-cases';
import { PostMenuCocktailReqBody, PostMenuCocktailResBody } from "@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types";
import { assertNumber, assertString } from "@cocktail-menu-builder/helpers/assertions";
import { NextFunction, Request, Response } from "express";

export class AddCocktailToMenuController {
  constructor(private readonly addCocktailToMenuUseCase: AddCocktailToMenuUseCase) { }

  public async handle(req: Request<unknown, PostMenuCocktailResBody, PostMenuCocktailReqBody>, res: Response<PostMenuCocktailResBody>, next: NextFunction): Promise<void> {
    try {
      const cocktail = this.validateBody(req.body);
      const menu = await this.addCocktailToMenuUseCase.execute(cocktail);
      res.status(201).json(menu);
    } catch (error) {
      next(error);
    }
  }

  private validateBody(body: PostMenuCocktailReqBody): PostMenuCocktailReqBody {
    const cocktail: PostMenuCocktailReqBody = {
        id: assertString({
            object: body,
            property: 'id',
        }),
        ...('name' in body) && body.name ? {
            name: assertString({
                object: body,
                property: 'name',
            }),
        } : {},
        ...('price' in body) && body.price !== null ? {
            price: assertNumber({
                object: body,
                property: 'price',
            }),
        } : {},
    };

    return cocktail;
}
}

