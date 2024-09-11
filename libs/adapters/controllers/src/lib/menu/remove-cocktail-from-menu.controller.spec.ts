import { AddCocktailToMenuUseCase, RemoveCocktailFromMenuUseCase } from '@cocktail-menu-builder/application/use-cases';
import { DeleteMenuCocktailReqParams, PostMenuCocktailReqBody, PostMenuCocktailResBody } from '@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types';
import { CustomError } from '@cocktail-menu-builder/helpers/error-handlers';
import { Request, Response } from "express";
import { RemoveCocktailFromMenuController } from './remove-cocktail-from-menu.controller';

describe('RemoveCocktailFromMenuController', () => {
  it('should fail when cocktail id is not provided', async () => {
    const req = {
      body: {
      } as unknown as PostMenuCocktailReqBody,
    } as Request<DeleteMenuCocktailReqParams>;

    const res = {
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn();

    const controller = new RemoveCocktailFromMenuController({
      execute: jest.fn(),
    } as unknown as RemoveCocktailFromMenuUseCase);

    await controller.handle(req, res, next);
    
    expect(next.mock.calls[0][0]).toBeInstanceOf(CustomError);
    expect(next.mock.calls[0][0]).toHaveProperty('message', 'cocktailId is required');
    expect(next.mock.calls[0][0]).toHaveProperty('status', 400);
  });

  it('should delete cocktail when cocktail id is provided', async () => {
    const req = {
      params: {
        cocktailId: '1',
      } as DeleteMenuCocktailReqParams,
    } as Request<DeleteMenuCocktailReqParams>;

    const res = {
      sendStatus: jest.fn(),
    } as unknown as Response;

    const next = jest.fn();

    const menu = {
      id: '1',
      name: 'Margarita',
      price: 10,
    };

    const controller = new RemoveCocktailFromMenuController({
      execute: jest.fn(),
    } as unknown as RemoveCocktailFromMenuUseCase);

    await controller.handle(req, res, next);
    
    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });
});