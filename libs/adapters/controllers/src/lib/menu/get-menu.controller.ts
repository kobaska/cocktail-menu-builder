import { GetMenuUseCase } from '@cocktail-menu-builder/application/use-cases';
import { GetMenuResBody } from "@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types";
import { NextFunction, Request, Response } from "express";

export class GetMenuController {
  constructor(private readonly getMenuUseCase: GetMenuUseCase) { }

  public async handle(_req: Request<unknown, GetMenuResBody>, res: Response<GetMenuResBody>, next: NextFunction): Promise<void> {
    try {
      const menu = await this.getMenuUseCase.execute();
      res.json(menu);
    } catch (error) {
      next(error);
    }
  }
}