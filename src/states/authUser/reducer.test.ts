/**
 * Test Scenario for authUserReducer
 *
 * - authUserReducer function
 *   - should return the initial state (null) when given an unknown action
 *   - should return the current state unchanged when given an unknown action
 *   - should return the authUser when given a SET_AUTH_USER action
 *   - should return null when given an UNSET_AUTH_USER action
 *   - should replace the existing authUser when given a SET_AUTH_USER action with a different user
 */

import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';
import type { User } from '../../utils/api';

const fakeUser: User = {
  id: 'user-1',
  name: 'Alice',
  email: 'alice@example.com',
  avatar: 'https://example.com/alice.jpg',
};

const anotherFakeUser: User = {
  id: 'user-2',
  name: 'Bob',
  email: 'bob@example.com',
  avatar: 'https://example.com/bob.jpg',
};

describe('authUserReducer', () => {
  it('should return the initial state (null) when given an unknown action', () => {
    // Arrange
    const initialState = undefined;
    const action = { type: 'UNKNOWN_ACTION' };

    // Action
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toBeNull();
  });

  it('should return the current state unchanged when given an unknown action', () => {
    // Arrange
    const currentState = fakeUser;
    const action = { type: 'UNKNOWN_ACTION' };

    // Action
    const nextState = authUserReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(fakeUser);
    expect(nextState).toBe(currentState);
  });

  it('should return the authUser when given a SET_AUTH_USER action', () => {
    // Arrange
    const initialState = null;
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: { authUser: fakeUser },
    };

    // Action
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(fakeUser);
  });

  it('should replace the existing authUser when given a SET_AUTH_USER action with a different user', () => {
    // Arrange
    const currentState = fakeUser;
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: { authUser: anotherFakeUser },
    };

    // Action
    const nextState = authUserReducer(currentState, action);

    // Assert
    expect(nextState).toEqual(anotherFakeUser);
    expect(nextState).not.toEqual(fakeUser);
  });

  // ── UNSET_AUTH_USER ─────────────────────────────────────────────────────

  it('should return null when given an UNSET_AUTH_USER action', () => {
    // Arrange
    const currentState = fakeUser;
    const action = { type: ActionType.UNSET_AUTH_USER };

    // Action
    const nextState = authUserReducer(currentState, action);

    // Assert
    expect(nextState).toBeNull();
  });
});
