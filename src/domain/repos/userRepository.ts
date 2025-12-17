import { User } from '../entities/user';
export interface IUserRepository {
  saveUser(user: User): Promise<number>;
  findUserByUsername(username: string): Promise<User | null>;
}
