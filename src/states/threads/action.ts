import api from '../../utils/api';
import type { Thread } from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
} as const;

export interface ReceiveThreadsAction {
  type: typeof ActionType.RECEIVE_THREADS;
  payload: { threads: Thread[] };
}

export interface AddThreadAction {
  type: typeof ActionType.ADD_THREAD;
  payload: { thread: Thread };
}

export type ThreadsAction = ReceiveThreadsAction | AddThreadAction;

export function receiveThreadsActionCreator(threads: Thread[]): ReceiveThreadsAction {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

export function addThreadActionCreator(thread: Thread): AddThreadAction {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

export function asyncCreateThread({ title, body, category }: Record<string, string>) {
  return async (dispatch: any): Promise<boolean> => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      return true;
    } catch (error: any) {
      alert(error.message);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}
