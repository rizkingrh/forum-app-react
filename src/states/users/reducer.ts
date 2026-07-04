import { ActionType } from './action';
import type { User } from '../../utils/api';

export type UsersState = User[];

function usersReducer(
  state: UsersState = [],
  action: any = { type: '' }
): UsersState {
  switch (action.type) {
  case ActionType.RECEIVE_USERS:
    return action.payload.users;
  default:
    return state;
  }
}

export default usersReducer;
