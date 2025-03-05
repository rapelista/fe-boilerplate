import { faker } from '~/utils/faker';

export const USERS = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  name: faker.person.fullName(),
  age: faker.number.int({ min: 17, max: 100 }),
}));
