import { PostMenuCocktailReqBody } from "@cocktail-menu-builder/apps/cocktail-menu-builder-api/req-types";
import { assertNumber, assertString } from "@cocktail-menu-builder/helpers/assertions";
import { CustomError } from "@cocktail-menu-builder/helpers/error-handlers";

export function validateBody(body: string): PostMenuCocktailReqBody {
    let parsedBody: object;

    try {
        parsedBody = JSON.parse(body || '{}');
    } catch (error) {
        throw new CustomError('Invalid JSON', 400);
    }

    const cocktail: PostMenuCocktailReqBody = {
        id: assertString({
            object: parsedBody,
            property: 'id',
            required: true,
        }),
        ...('name' in parsedBody) && {
            name: assertString({
                object: parsedBody,
                property: 'name',
            }),
        },
        ...('price' in parsedBody) && {
            price: assertNumber({
                object: parsedBody,
                property: 'price',
            }),
        },
    };

    return cocktail;
}