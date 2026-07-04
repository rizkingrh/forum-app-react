import { ActionType } from './action';
import type { Thread } from '../../utils/api';

export type ThreadsState = Thread[];

function threadsReducer(
  state: ThreadsState = [],
  action: any = { type: '' }
): ThreadsState {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;
  case ActionType.ADD_THREAD:
    return [action.payload.thread, ...state];
  default:
    return state;
  }
}

export default threadsReducer;
