import { GetCocktailsUseCase } from '@cocktail-menu-builder/application/use-cases';
import { GetCocktailsReqQuery, GetCocktailsResBody } from '@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types';
import { CustomError } from '@cocktail-menu-builder/helpers/error-handlers';
import { Request, Response } from "express";
import { GetCocktailsController } from './get-cocktails.controller';

describe('GetCocktailsController', () => {
  it('when no ingredient is provided, should return 400', async () => {
    const req = {
      query: {},
    } as Request<unknown, GetCocktailsResBody, unknown, GetCocktailsReqQuery>;

    const res = {
      json: jest.fn(),
    } as unknown as Response<GetCocktailsResBody>;

    const next = jest.fn();

    const controller = new GetCocktailsController({
      execute: jest.fn(),
    } as unknown as GetCocktailsUseCase);

    await controller.handle(req, res, next);
    
    expect(next.mock.calls[0][0]).toBeInstanceOf(CustomError);
    expect(next.mock.calls[0][0]).toHaveProperty('message', 'ingredient is required');
    expect(next.mock.calls[0][0]).toHaveProperty('status', 400);
  });

  it('when ingredient is provided, should return cocktails', async () => {
    const req = {
      query: {
        ingredient: 'vodka',
      },
    } as Request<unknown, GetCocktailsResBody, unknown, GetCocktailsReqQuery>;

    const res = {
      json: jest.fn(),
    } as unknown as Response<GetCocktailsResBody>;

    const next = jest.fn();

    const cocktails = [{
      id: 'id',
      name: 'name'
    }];

    const controller = new GetCocktailsController({
      execute: jest.fn().mockResolvedValue(cocktails),
    } as unknown as GetCocktailsUseCase);

    await controller.handle(req, res, next);
    
    expect(res.json).toHaveBeenCalledWith(cocktails);
  });
});