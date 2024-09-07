import { GetMenuUseCase } from '@cocktail-menu-builder/application/use-cases';
import { GetMenuResBody } from '@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types';
import { Menu } from '@cocktail-menu-builder/domain/entities';
import { Request, Response } from "express";
import { GetMenuController } from './get-menu.controller';

describe('GetMenuController', () => {
  it('should return menu', async () => {
    const req = {
    } as Request<unknown, GetMenuResBody>;

    const res = {
      json: jest.fn(),
    } as unknown as Response<GetMenuResBody>;

    const next = jest.fn();

    const menu: Menu = {
      cocktails: [{
        id: '1',
        name: 'Margarita',
        price: 10,
      }]
    };

    const controller = new GetMenuController({
      execute: jest.fn().mockResolvedValue(menu),
    } as unknown as GetMenuUseCase);

    await controller.handle(req, res, next);

    expect(res.json).toHaveBeenCalledWith(menu);
  });
});