import { IUserRepository } from '../../domain/repos/userRepository';
import { User } from '../../domain/entities/user';

export class RegisterUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute(user: User): Promise<number> {
    if (!user.username || !user.password) throw new Error('username and password required');
    const id = await this.userRepo.saveUser(user);
    return id;
  }
}
