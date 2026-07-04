import api from '../../utils/api';
import type { User } from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
} as const;

export interface ReceiveUsersAction {
  type: typeof ActionType.RECEIVE_USERS;
  payload: { users: User[] };
}

export type UsersAction = ReceiveUsersAction;

export function receiveUsersActionCreator(users: User[]): ReceiveUsersAction {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

export function asyncRegisterUser({ name, email, password }: Record<string, string>) {
  return async (dispatch: any): Promise<boolean> => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
      return true;
    } catch (error: any) {
      alert(error.message);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}
