/**
 * E2E Test Scenario for Login Page
 *
 * - Login page
 *   - should display the login form correctly
 *   - should disable the Sign In button when email and password are empty
 *   - should disable the Sign In button when password is fewer than 6 characters
 *   - should enable the Sign In button when email and password are valid
 *   - should redirect to the home page after a successful login
 *   - should show an alert and stay on the login page after a failed login
 *   - should navigate to the register page when clicking the Sign up link
 */

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display the login form correctly', () => {
    // Assert
    cy.contains('h1', 'Welcome Back').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.contains('button', 'Sign In').should('be.visible');
    cy.contains('a', 'Sign up').should('be.visible');
  });

  it('should disable the Sign In button when email and password are empty', () => {
    // Assert
    cy.contains('button', 'Sign In').should('be.disabled');
  });

  it('should disable the Sign In button when password is fewer than 6 characters', () => {
    // Arrange
    const shortPassword = '12345';

    // Action
    cy.get('input[type="email"]').type('user@example.com');
    cy.get('input[type="password"]').type(shortPassword);

    // Assert
    cy.contains('button', 'Sign In').should('be.disabled');
  });

  it('should enable the Sign In button when email and password are valid', () => {
    // Arrange
    const validEmail = 'user@example.com';
    const validPassword = 'secret123';

    // Action
    cy.get('input[type="email"]').type(validEmail);
    cy.get('input[type="password"]').type(validPassword);

    // Assert
    cy.contains('button', 'Sign In').should('be.enabled');
  });

  it('should redirect to the home page after a successful login', () => {
    // Arrange
    const validEmail = 'rizki.adenugraha@gmail.com';
    const validPassword = 'rzkngrh';

    // Action
    cy.get('input[type="email"]').type(validEmail);
    cy.get('input[type="password"]').type(validPassword);
    cy.contains('button', 'Sign In').click();

    // Assert
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  });

  it('should show an alert and stay on the login page after a failed login', () => {
    // Arrange
    const invalidEmail = 'wrong@example.com';
    const invalidPassword = 'wrongpassword';

    // Stub window.alert to catch it without blocking the test
    cy.on('window:alert', (message) => {
      expect(message).to.equal('email or password is wrong');
    });

    // Action
    cy.get('input[type="email"]').type(invalidEmail);
    cy.get('input[type="password"]').type(invalidPassword);
    cy.contains('button', 'Sign In').click();

    // Assert
    cy.url().should('include', '/login');
  });

  it('should navigate to the register page when clicking the Sign up link', () => {
    // Action
    cy.contains('a', 'Sign up').click();

    // Assert
    cy.url().should('include', '/register');
  });
});
