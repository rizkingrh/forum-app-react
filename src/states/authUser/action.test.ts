/**
 * Test Scenario for authUser thunk functions
 *
 * - asyncSetAuthUser thunk
 *   - should dispatch showLoading, setAuthUser, and hideLoading on success
 *   - should return true on success
 *   - should dispatch showLoading, call alert, and dispatch hideLoading on failure
 *   - should return false on failure
 *
 * - asyncUnsetAuthUser thunk
 *   - should call api.putAccessToken with an empty string and dispatch unsetAuthUser
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { asyncSetAuthUser, asyncUnsetAuthUser, setAuthUserActionCreator, unsetAuthUserActionCreator } from './action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import type { User } from '../../utils/api';

vi.mock('../../utils/api');
vi.mock('react-redux-loading-bar', () => ({
  showLoading: vi.fn(() => ({ type: 'SHOW_LOADING' })),
  hideLoading: vi.fn(() => ({ type: 'HIDE_LOADING' })),
}));
vi.stubGlobal('alert', vi.fn());

const fakeToken = 'fake-jwt-token';

const fakeUser: User = {
  id: 'user-1',
  name: 'Alice',
  email: 'alice@example.com',
  avatar: 'https://example.com/alice.jpg',
};

const fakeCredentials = {
  email: 'alice@example.com',
  password: 'secret123',
};

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch showLoading, setAuthUser, and hideLoading on success', async () => {
    // Arrange
    vi.mocked(api.login).mockResolvedValue(fakeToken);
    vi.mocked(api.getOwnProfile).mockResolvedValue(fakeUser);
    const dispatch = vi.fn();

    // Action
    await asyncSetAuthUser(fakeCredentials)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('should return true on success', async () => {
    // Arrange
    vi.mocked(api.login).mockResolvedValue(fakeToken);
    vi.mocked(api.getOwnProfile).mockResolvedValue(fakeUser);
    const dispatch = vi.fn();

    // Action
    const result = await asyncSetAuthUser(fakeCredentials)(dispatch);

    // Assert
    expect(result).toBe(true);
  });

  it('should dispatch showLoading, call alert, and dispatch hideLoading on failure', async () => {
    // Arrange
    const errorMessage = 'Invalid credentials';
    vi.mocked(api.login).mockRejectedValue(new Error(errorMessage));
    const dispatch = vi.fn();

    // Action
    await asyncSetAuthUser(fakeCredentials)(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(errorMessage);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).not.toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it('should return false on failure', async () => {
    // Arrange
    vi.mocked(api.login).mockRejectedValue(new Error('Invalid credentials'));
    const dispatch = vi.fn();

    // Action
    const result = await asyncSetAuthUser(fakeCredentials)(dispatch);

    // Assert
    expect(result).toBe(false);
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call api.putAccessToken with an empty string and dispatch unsetAuthUser', () => {
    // Arrange
    const dispatch = vi.fn();

    // Action
    asyncUnsetAuthUser()(dispatch);

    // Assert
    expect(api.putAccessToken).toHaveBeenCalledWith('');
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
