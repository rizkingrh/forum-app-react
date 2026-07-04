import { ActionType } from './action';

export type IsPreloadState = boolean;

function isPreloadReducer(
  state: IsPreloadState = true,
  action: any = { type: '' }
): IsPreloadState {
  switch (action.type) {
  case ActionType.SET_IS_PRELOAD:
    return action.payload.isPreload;
  default:
    return state;
  }
}

export default isPreloadReducer;
