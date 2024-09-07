import { AddCocktailToMenuUseCase } from '@cocktail-menu-builder/application/use-cases';
import { PostMenuCocktailReqBody, PostMenuCocktailResBody } from '@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types';
import { CustomError } from '@cocktail-menu-builder/helpers/error-handlers';
import { Request, Response } from "express";
import { AddCocktailToMenuController } from './add-cocktail-to-menu.controller';

describe('AddCocktailToMenuController', () => {
  describe('should fail when invalid body is provided', () => {
    it('should fail when no id is provided', async () => {
      const req = {
        body: {
        } as unknown as PostMenuCocktailReqBody,
      } as Request<unknown, PostMenuCocktailResBody, PostMenuCocktailReqBody>;
  
      const res = {
        json: jest.fn(),
      } as unknown as Response<PostMenuCocktailResBody>;
  
      const next = jest.fn();
  
      const controller = new AddCocktailToMenuController({
        execute: jest.fn(),
      } as unknown as AddCocktailToMenuUseCase);
  
      await controller.handle(req, res, next);
      
      expect(next.mock.calls[0][0]).toBeInstanceOf(CustomError);
      expect(next.mock.calls[0][0]).toHaveProperty('message', 'id is required');
      expect(next.mock.calls[0][0]).toHaveProperty('status', 400);
    });

    it('should fail invalid name is provided', async () => {
      const req = {
        body: {
          id: '1',
          name: 1,
        } as unknown as PostMenuCocktailReqBody,
      } as Request<unknown, PostMenuCocktailResBody, PostMenuCocktailReqBody>;
  
      const res = {
        json: jest.fn(),
      } as unknown as Response<PostMenuCocktailResBody>;
  
      const next = jest.fn();
  
      const controller = new AddCocktailToMenuController({
        execute: jest.fn(),
      } as unknown as AddCocktailToMenuUseCase);
  
      await controller.handle(req, res, next);
      
      expect(next.mock.calls[0][0]).toBeInstanceOf(CustomError);
      expect(next.mock.calls[0][0]).toHaveProperty('message', 'Invalid name provided');
      expect(next.mock.calls[0][0]).toHaveProperty('status', 400);
    });

    it('should fail invalid price is provided', async () => {
      const req = {
        body: {
          id: '1',
          name: 'Margarita',
          price: false
        } as unknown as PostMenuCocktailReqBody,
      } as Request<unknown, PostMenuCocktailResBody, PostMenuCocktailReqBody>;
  
      const res = {
        json: jest.fn(),
      } as unknown as Response<PostMenuCocktailResBody>;
  
      const next = jest.fn();
  
      const controller = new AddCocktailToMenuController({
        execute: jest.fn(),
      } as unknown as AddCocktailToMenuUseCase);
  
      await controller.handle(req, res, next);
      
      expect(next.mock.calls[0][0]).toBeInstanceOf(CustomError);
      expect(next.mock.calls[0][0]).toHaveProperty('message', 'Invalid price provided');
      expect(next.mock.calls[0][0]).toHaveProperty('status', 400);
    });
  });

  it('should pass when valid body is provided', async () => {
    const req = {
      body: {
        id: '1',
      } as PostMenuCocktailReqBody,
    } as Request<unknown, PostMenuCocktailResBody, PostMenuCocktailReqBody>;

    const res = {
      json: jest.fn(),
    } as unknown as Response<PostMenuCocktailResBody>;
    res.status = jest.fn(() => res);

    const next = jest.fn();

    const menu = {
      id: '1',
      name: 'Margarita',
      price: null,
    };

    const controller = new AddCocktailToMenuController({
      execute: jest.fn().mockResolvedValue(menu),
    } as unknown as AddCocktailToMenuUseCase);

    await controller.handle(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(menu);
  });
});