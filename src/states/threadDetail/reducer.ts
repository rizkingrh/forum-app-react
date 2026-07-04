import { ActionType } from './action';
import type { ThreadDetail } from '../../utils/api';

export type ThreadDetailState = ThreadDetail | null;

function threadDetailReducer(
  state: ThreadDetailState = null,
  action: any = { type: '' }
): ThreadDetailState {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.CLEAR_THREAD_DETAIL:
    return null;
  case ActionType.ADD_COMMENT:
    if (!state) return null;
    return {
      ...state,
      comments: [action.payload.comment, ...state.comments],
    };
  default:
    return state;
  }
}

export default threadDetailReducer;
