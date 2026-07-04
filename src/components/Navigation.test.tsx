/**
 * Test Scenario for Navigation component
 *
 * - Navigation component
 *   - when user is not logged in
 *     - should render the brand name "DevTalk"
 *     - should render a login link pointing to /login
 *     - should not render a logout button
 *     - should not render a user avatar
 *   - when user is logged in
 *     - should render the brand name "DevTalk"
 *     - should render the user avatar with the correct src and alt
 *     - should render the user's name
 *     - should render a logout button
 *     - should not render a login link
 *     - should dispatch asyncUnsetAuthUser and navigate to "/" when logout is clicked
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Navigation from './Navigation';
import authUserReducer from '../states/authUser/reducer';

// Mock the async thunk so we can spy on dispatch without hitting the API
vi.mock('../states/authUser/action', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../states/authUser/action')>();
  return {
    ...actual,
    asyncUnsetAuthUser: vi.fn(() => ({ type: 'authUser/unset' })),
  };
});

// Mock useNavigate so we can assert the redirect
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const fakeUser = {
  id: 'user-1',
  name: 'Alice',
  email: 'alice@example.com',
  avatar: 'https://example.com/alice.jpg',
};

function buildStore(authUser: typeof fakeUser | null) {
  return configureStore({
    reducer: { authUser: authUserReducer },
    preloadedState: { authUser },
  });
}

function renderNavigation(authUser: typeof fakeUser | null = null) {
  const store = buildStore(authUser);
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    </Provider>
  );
  return { store };
}

describe('Navigation component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when user is not logged in', () => {
    it('should render the brand name "DevTalk"', () => {
      // Arrange & Action
      renderNavigation(null);

      // Assert
      expect(screen.getByText('DevTalk')).toBeInTheDocument();
    });

    it('should render a login link pointing to /login', () => {
      // Arrange & Action
      renderNavigation(null);

      // Assert
      const loginLink = screen.getByRole('link', { name: /login/i });
      expect(loginLink).toBeInTheDocument();
      expect(loginLink).toHaveAttribute('href', '/login');
    });

    it('should not render a logout button', () => {
      // Arrange & Action
      renderNavigation(null);

      // Assert
      expect(screen.queryByTitle('Logout')).not.toBeInTheDocument();
    });

    it('should not render a user avatar', () => {
      // Arrange & Action
      renderNavigation(null);

      // Assert
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });

  describe('when user is logged in', () => {
    it('should render the brand name "DevTalk"', () => {
      // Arrange & Action
      renderNavigation(fakeUser);

      // Assert
      expect(screen.getByText('DevTalk')).toBeInTheDocument();
    });

    it('should render the user avatar with the correct src and alt', () => {
      // Arrange & Action
      renderNavigation(fakeUser);

      // Assert
      const avatar = screen.getByRole('img', { name: fakeUser.name });
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', fakeUser.avatar);
    });

    it("should render the user's name", () => {
      // Arrange & Action
      renderNavigation(fakeUser);

      // Assert
      expect(screen.getByText(fakeUser.name)).toBeInTheDocument();
    });

    it('should render a logout button', () => {
      // Arrange & Action
      renderNavigation(fakeUser);

      // Assert
      expect(screen.getByTitle('Logout')).toBeInTheDocument();
    });

    it('should not render a login link', () => {
      // Arrange & Action
      renderNavigation(fakeUser);

      // Assert
      expect(screen.queryByRole('link', { name: /login/i })).not.toBeInTheDocument();
    });

    it('should dispatch asyncUnsetAuthUser and navigate to "/" when logout is clicked', async () => {
      // Arrange
      const { asyncUnsetAuthUser } = await import('../states/authUser/action');
      const user = userEvent.setup();
      renderNavigation(fakeUser);

      // Action
      await user.click(screen.getByTitle('Logout'));

      // Assert
      expect(asyncUnsetAuthUser).toHaveBeenCalledOnce();
      expect(mockNavigate).toHaveBeenCalledOnce();
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
