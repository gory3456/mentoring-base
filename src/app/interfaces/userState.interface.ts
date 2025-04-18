import { User } from '../interfaces/user';

export interface IUsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}
