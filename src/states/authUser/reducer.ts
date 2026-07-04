import { ActionType } from './action';
import type { User } from '../../utils/api';

export type AuthUserState = User | null;

function authUserReducer(
  state: AuthUserState = null,
  action: any = { type: '' }
): AuthUserState {
  switch (action.type) {
  case ActionType.SET_AUTH_USER:
    return action.payload.authUser;
  case ActionType.UNSET_AUTH_USER:
    return null;
  default:
    return state;
  }
}

export default authUserReducer;
