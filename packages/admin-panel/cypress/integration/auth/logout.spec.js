const TEST_USER_EMAIL = Cypress.env('test_user_email')
const TEST_USER_PASSWORD = Cypress.env('test_user_password')
describe('Logout procedure', () => {
  before(() => {
    cy.login(TEST_USER_EMAIL, TEST_USER_PASSWORD)
    cy.logout()
  })
  it('should log out the logged in user', () => {
    cy.contains('Log in')
  })
  it('should redirect to the login page when trying to access a protected route', () => {
    cy.visit(Cypress.env('host'))
    cy.contains('Log in')
  })
})
