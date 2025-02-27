import { EntityType } from '../core/entity';

export type UserType = EntityType & {
  name: string;
  age: number;
};
