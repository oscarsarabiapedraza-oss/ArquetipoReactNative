import { makeAutoObservable } from 'mobx';
import { LoginUseCase } from '../../application/usecases/loginUseCase';
import { RegisterUserUseCase } from '../../application/usecases/registerUserUseCase';
import { SQLiteUserRepository } from '../../infrastructure/repos/sqliteUserRepository';
import { APIConfig } from '../../infrastructure/config/apiConfig';

export class AuthViewModel {
  loading = false;
  error: string | null = null;
  isAuthenticated = false;

  private loginUseCase = new LoginUseCase();
  private registerUseCase: RegisterUserUseCase;
  private sqliteRepo = new SQLiteUserRepository();

  constructor() {
    makeAutoObservable(this);
    this.registerUseCase = new RegisterUserUseCase(this.sqliteRepo);
    this.sqliteRepo.init().catch(e => console.warn('DB init failed', e));
  }

  setApiBaseUrl(url: string) {
    APIConfig.baseUrl = url;
  }

  async login(username: string, password: string) {
    this.loading = true;
    this.error = null;
    try {
      const ok = await this.loginUseCase.execute(username, password);
      this.isAuthenticated = ok;
      if (!ok) this.error = 'Credenciales inválidas';
    } catch (e: any) {
      this.error = e.message || 'Error en la API';
    } finally {
      this.loading = false;
    }
  }

  async register(username: string, password: string, fullName?: string) {
    this.loading = true;
    this.error = null;
    try {
      const id = await this.registerUseCase.execute({ username, password, fullName });
      return id;
    } catch (e: any) {
      this.error = e.message || 'Error al registrar';
      throw e;
    } finally {
      this.loading = false;
    }
  }
}
