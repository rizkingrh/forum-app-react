import api from '../../utils/api';
import type { ThreadDetail, Comment } from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const ActionType = {
  RECEIVE_THREAD_DETAIL: 'threadDetail/receive',
  CLEAR_THREAD_DETAIL: 'threadDetail/clear',
  ADD_COMMENT: 'comment/add',
} as const;

export interface ReceiveThreadDetailAction {
  type: typeof ActionType.RECEIVE_THREAD_DETAIL;
  payload: { threadDetail: ThreadDetail };
}

export interface ClearThreadDetailAction {
  type: typeof ActionType.CLEAR_THREAD_DETAIL;
}

export interface AddCommentAction {
  type: typeof ActionType.ADD_COMMENT;
  payload: { comment: Comment };
}

export type ThreadDetailAction =
  | ReceiveThreadDetailAction
  | ClearThreadDetailAction
  | AddCommentAction;

export function receiveThreadDetailActionCreator(threadDetail: ThreadDetail): ReceiveThreadDetailAction {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

export function clearThreadDetailActionCreator(): ClearThreadDetailAction {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

export function addCommentActionCreator(comment: Comment): AddCommentAction {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

export function asyncReceiveThreadDetail(threadId: string) {
  return async (dispatch: any): Promise<void> => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error: any) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export function asyncCreateComment({ threadId, content }: { threadId: string; content: string }) {
  return async (dispatch: any): Promise<boolean> => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
      return true;
    } catch (error: any) {
      alert(error.message);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}
