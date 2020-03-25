const TEST_USER_EMAIL = Cypress.env('test_user_email')
const TEST_USER_PASSWORD = Cypress.env('test_user_password')
const login_url = [Cypress.env('host'), 'login'].join('/')

describe('Login procedure', () => {
  describe('when valid credentials are passed', () => {
    before(() => {
      cy.login(TEST_USER_EMAIL, TEST_USER_PASSWORD)
    })
    it('should log the user in and redirect to the dashboard', () => {
      cy.contains('FitUp Plus')
    })
    it('should redirect the user when they try to access the login page when logged in', () => {
      cy.visit(login_url)
      cy.contains('FitUp Plus')
    })
  })
  describe('when invalid credentials are passed', () => {
    it('should show that email and password are required fields when both are left blank', () => {
      cy.server()
      cy.route({
        method: 'GET',
        url: [Cypress.env('api_url'), 'user'].join('/')
      }).as('user_route')

      cy.visit(login_url)
      cy.wait('@user_route')

      cy.get('button[type="submit"]').click()

      cy.contains('Email is required')
      cy.contains('Password is required')
    })
    it('should show an error when credentials are incorrect', () => {
      const NON_EXISTING_EMAIL = 'unknown@user.dev'
      const PASSWORD = 'unknown'
      cy.login(NON_EXISTING_EMAIL, PASSWORD)
      cy.get('.ant-alert').contains(
        'These credentials do not match our records'
      )
    })
  })
})
