import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
} as const;

export interface SetIsPreloadAction {
  type: typeof ActionType.SET_IS_PRELOAD;
  payload: { isPreload: boolean };
}

export type IsPreloadAction = SetIsPreloadAction;

export function setIsPreloadActionCreator(isPreload: boolean): SetIsPreloadAction {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

export function asyncPreloadProcess() {
  return async (dispatch: any): Promise<void> => {
    dispatch(showLoading());
    try {
      const accessToken = api.getAccessToken();
      if (accessToken) {
        const authUser = await api.getOwnProfile();
        dispatch(setAuthUserActionCreator(authUser));
      }
    } catch {
      // Token is invalid/expired
      api.putAccessToken('');
    } finally {
      dispatch(setIsPreloadActionCreator(false));
      dispatch(hideLoading());
    }
  };
}
