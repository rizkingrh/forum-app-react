import api from '../../utils/api';
import type { User } from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const ActionType = {
  SET_AUTH_USER: 'authUser/set',
  UNSET_AUTH_USER: 'authUser/unset',
} as const;

export interface SetAuthUserAction {
  type: typeof ActionType.SET_AUTH_USER;
  payload: { authUser: User };
}

export interface UnsetAuthUserAction {
  type: typeof ActionType.UNSET_AUTH_USER;
}

export type AuthUserAction = SetAuthUserAction | UnsetAuthUserAction;

export function setAuthUserActionCreator(authUser: User): SetAuthUserAction {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

export function unsetAuthUserActionCreator(): UnsetAuthUserAction {
  return {
    type: ActionType.UNSET_AUTH_USER,
  };
}

export function asyncSetAuthUser({ email, password }: Record<string, string>) {
  return async (dispatch: any): Promise<boolean> => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
      return true;
    } catch (error: any) {
      alert(error.message);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

export function asyncUnsetAuthUser() {
  return (dispatch: any): void => {
    api.putAccessToken('');
    dispatch(unsetAuthUserActionCreator());
  };
}
