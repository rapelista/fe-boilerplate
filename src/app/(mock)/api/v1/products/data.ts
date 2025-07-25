import { faker } from '~/libs/faker';

export const products = Array.from({ length: 100 }, (_, i) => {
  const id = i + 1;
  const name = faker.commerce.productName();

  return {
    id,
    name,
  };
});
