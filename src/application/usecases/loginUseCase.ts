import { api } from '../../infrastructure/api/apiClient';

export class LoginUseCase {
  async execute(username: string, password: string): Promise<boolean> {
    const resp = await api.post('/auth/login', { username, password });
    if (resp?.data?.success === true) return true;
    if (typeof resp?.data === 'boolean') return resp.data === true;
    return false;
  }
}
