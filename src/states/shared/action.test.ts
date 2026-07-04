/**
 * Test Scenario for asyncPopulateUsersAndThreads (thunk)
 *
 * - asyncPopulateUsersAndThreads thunk
 *   - should dispatch showLoading, receiveUsers, receiveThreads, and hideLoading on success
 *   - should dispatch showLoading, call alert, and dispatch hideLoading on failure
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { asyncPopulateUsersAndThreads } from './action';
import { receiveUsersActionCreator } from '../users/action';
import { receiveThreadsActionCreator } from '../threads/action';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import type { User, Thread } from '../../utils/api';

vi.mock('../../utils/api');
vi.mock('react-redux-loading-bar', () => ({
  showLoading: vi.fn(() => ({ type: 'SHOW_LOADING' })),
  hideLoading: vi.fn(() => ({ type: 'HIDE_LOADING' })),
}));
vi.stubGlobal('alert', vi.fn());

const fakeUsers: User[] = [
  {
    id: 'user-1',
    name: 'Alice',
    email: 'alice@example.com',
    avatar: 'https://example.com/alice.jpg',
  },
  {
    id: 'user-2',
    name: 'Bob',
    email: 'bob@example.com',
    avatar: 'https://example.com/bob.jpg',
  },
];

const fakeThreads: Thread[] = [
  {
    id: 'thread-1',
    title: 'First Thread',
    body: 'Body of the first thread',
    category: 'general',
    createdAt: '2024-01-01T00:00:00.000Z',
    ownerId: 'user-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: 'thread-2',
    title: 'Second Thread',
    body: 'Body of the second thread',
    category: 'react',
    createdAt: '2024-01-02T00:00:00.000Z',
    ownerId: 'user-2',
    upVotesBy: ['user-1'],
    downVotesBy: [],
    totalComments: 3,
  },
];

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch showLoading, receiveUsers, receiveThreads, and hideLoading on success', async () => {
    // Arrange
    vi.mocked(api.getAllUsers).mockResolvedValue(fakeUsers);
    vi.mocked(api.getAllThreads).mockResolvedValue(fakeThreads);
    const dispatch = vi.fn();

    // Action
    await asyncPopulateUsersAndThreads()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsers));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreads));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });

  it('should dispatch showLoading, call alert, and dispatch hideLoading on failure', async () => {
    // Arrange
    const errorMessage = 'Failed to fetch data';
    vi.mocked(api.getAllUsers).mockRejectedValue(new Error(errorMessage));
    vi.mocked(api.getAllThreads).mockRejectedValue(new Error(errorMessage));
    const dispatch = vi.fn();

    // Action
    await asyncPopulateUsersAndThreads()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(errorMessage);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).not.toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsers));
    expect(dispatch).not.toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreads));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
