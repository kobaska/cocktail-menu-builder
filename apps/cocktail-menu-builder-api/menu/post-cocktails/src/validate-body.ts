import { PostMenuCocktailReqBody } from "@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types";
import { assertNumber, assertString } from "@cocktail-menu-builder/helpers/assertions";
import { CustomError } from "@cocktail-menu-builder/helpers/error-handlers";

export function validateBody(body: string): PostMenuCocktailReqBody {
    let parsedBody: object;

    try {
        parsedBody = JSON.parse(body || '{}');

        if (!parsedBody || typeof parsedBody !== 'object') {
            throw new Error('Invalid JSON');
        }
    } catch (error) {
        throw new CustomError('Invalid JSON', 400);
    }

    const cocktail: PostMenuCocktailReqBody = {
        id: assertString({
            object: parsedBody,
            property: 'id',
        }),
        ...('name' in parsedBody) && parsedBody.name && {
            name: assertString({
                object: parsedBody,
                property: 'name',
            }),
        },
        ...('price' in parsedBody) && parsedBody.price !== null && {
            price: assertNumber({
                object: parsedBody,
                property: 'price',
            }),
        },
    };

    return cocktail;
}