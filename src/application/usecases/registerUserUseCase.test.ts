import { RegisterUserUseCase } from './registerUserUseCase';

test('register missing fields throws', async () => {
  const fakeRepo: any = { saveUser: jest.fn().mockResolvedValue(1) };
  const uc = new RegisterUserUseCase(fakeRepo);
  await expect(uc.execute({ username: '', password: '' })).rejects.toThrow();
});
