/**
 * Test Scenario for threadsReducer
 *
 * - threadsReducer function
 *   - should return the initial state when given an unknown action
 *   - should return the current state unchanged when given an unknown action
 *   - should return the threads payload when given a RECEIVE_THREADS action
 *   - should replace existing threads with the payload when given a RECEIVE_THREADS action
 *   - should return empty array when given RECEIVE_THREADS action with empty array
 *   - should prepend the new thread to the list when given an ADD_THREAD action
 *   - should contain only the new thread when given ADD_THREAD on an empty state
 *   - should not mutate the original state when given an ADD_THREAD action
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';
import type { Thread } from '../../utils/api';

const fakeThread1: Thread = {
  id: 'thread-1',
  title: 'First Thread',
  body: 'Body of the first thread',
  category: 'general',
  createdAt: '2024-01-01T00:00:00.000Z',
  ownerId: 'user-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeThread2: Thread = {
  id: 'thread-2',
  title: 'Second Thread',
  body: 'Body of the second thread',
  category: 'react',
  createdAt: '2024-01-02T00:00:00.000Z',
  ownerId: 'user-2',
  upVotesBy: ['user-1'],
  downVotesBy: [],
  totalComments: 3,
};

const fakeThread3: Thread = {
  id: 'thread-3',
  title: 'Newly Created Thread',
  body: 'This is a brand new thread',
  category: 'typescript',
  createdAt: '2024-01-03T00:00:00.000Z',
  ownerId: 'user-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

describe('threadsReducer', () => {
  it('should return the initial state (empty array) when given an unknown action', () => {
    // Arrange
    const initialState = undefined;
    const action = { type: 'UNKNOWN_ACTION' };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([]);
  });

  it('should return the current state unchanged when given an unknown action', () => {
    // Arrange
    const currentState = [fakeThread1, fakeThread2];
    const action = { type: 'UNKNOWN_ACTION' };

    // Action
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(nextState).toEqual([fakeThread1, fakeThread2]);
    expect(nextState).toBe(currentState);
  });

  it('should return the threads payload when given a RECEIVE_THREADS action', () => {
    // Arrange
    const initialState = undefined;
    const threads = [fakeThread1, fakeThread2];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: { threads },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(threads);
  });

  it('should replace existing threads with the payload when given a RECEIVE_THREADS action', () => {
    // Arrange
    const currentState = [fakeThread1];
    const newThreads = [fakeThread2, fakeThread3];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: { threads: newThreads },
    };

    // Action
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(newThreads);
    expect(nextState).not.toContainEqual(fakeThread1);
  });

  it('should return an empty array when given RECEIVE_THREADS action with an empty array', () => {
    // Arrange
    const currentState = [fakeThread1, fakeThread2];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: { threads: [] },
    };

    // Action
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(nextState).toEqual([]);
  });

  it('should prepend the new thread to the list when given an ADD_THREAD action', () => {
    // Arrange
    const currentState = [fakeThread1, fakeThread2];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: { thread: fakeThread3 },
    };

    // Action
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(nextState).toHaveLength(3);
    expect(nextState[0]).toEqual(fakeThread3);
    expect(nextState[1]).toEqual(fakeThread1);
    expect(nextState[2]).toEqual(fakeThread2);
  });

  it('should contain only the new thread when given ADD_THREAD on an empty state', () => {
    // Arrange
    const initialState: Thread[] = [];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: { thread: fakeThread1 },
    };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toHaveLength(1);
    expect(nextState[0]).toEqual(fakeThread1);
  });

  it('should not mutate the original state when given an ADD_THREAD action', () => {
    // Arrange
    const currentState = [fakeThread1, fakeThread2];
    const originalStateCopy = [...currentState];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: { thread: fakeThread3 },
    };

    // Action
    const nextState = threadsReducer(currentState, action);

    // Assert
    expect(currentState).toEqual(originalStateCopy);
    expect(nextState).not.toBe(currentState);
  });
});
