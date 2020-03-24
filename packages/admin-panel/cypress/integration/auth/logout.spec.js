const TEST_USER_EMAIL = Cypress.env('test_user_email')
const TEST_USER_PASSWORD = Cypress.env('test_user_password')

describe('Logout procedure', () => {
  before(() => {
    cy.login(TEST_USER_EMAIL, TEST_USER_PASSWORD)
  })
  it('should log out the logged in user', () => {
    cy.logout()
    cy.contains('Log in')
  })
})
