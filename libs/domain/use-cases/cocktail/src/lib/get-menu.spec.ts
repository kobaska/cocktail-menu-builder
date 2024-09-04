import { getMenu } from './get-menu';

describe('getMenu', () => {
  it('should work when cocktails are returned', async () => {
    const menu = {
      cocktails: [
        {
          id: 'filteredId',
          name: 'filteredName',
          price: 10
        }
      ]
    };

    const cocktailMenu = await getMenu({
      getMenuImplementor: async () => Promise.resolve(menu)
      ,
    });

    expect(cocktailMenu).toEqual(menu);
  });

  it('should not leak internal error information', async () => {
    await expect(
      getMenu({
        getMenuImplementor: async () => {
          throw new Error('Invalid database password');
        },
      })).rejects.toThrow('Failed to fetch menu');
  });
});
