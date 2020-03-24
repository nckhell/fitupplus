// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

const API_endpoints = {
  csrf_cookie: [Cypress.env('airlock_url'), 'airlock/csrf-cookie'].join('/'),
  login: [Cypress.env('airlock_url'), 'login'].join('/'),
  user: [Cypress.env('api_url'), 'user'].join('/')
}

Cypress.Commands.add('login', (email, password) => {
  const login_url = [Cypress.env('host'), 'login'].join('/')

  cy.server()
  cy.route({
    method: 'GET',
    url: API_endpoints['user']
  }).as('user_route')
  cy.route({
    method: 'GET',
    url: API_endpoints['csrf_cookie']
  }).as('csrf_route')
  cy.route({
    method: 'POST',
    url: API_endpoints['login']
  }).as('login_route')

  cy.visit(login_url)
  cy.wait(['@user_route']) // Check if their is no current user

  // Fill in credentials and submit
  cy.get('input#login_form_email')
    .type(email)
    .should('have.value', email)
  cy.get('input#login_form_password')
    .type(password)
    .should('have.value', password)
  cy.get('button[type="submit"]').click()

  // Wait for the API calls to resolve
  cy.wait(['@csrf_route', '@login_route'])
})

Cypress.Commands.add('logout', () => {
  const logout_endpoint = [Cypress.env('airlock_url'), 'logout'].join('/')
  const app_route = Cypress.env('host')

  cy.server()
  cy.route({
    method: 'GET',
    url: API_endpoints['user']
  }).as('user_route')
  cy.route({
    method: 'POST',
    url: logout_endpoint
  }).as('logout_route')

  cy.visit(app_route)
  cy.wait(['@user_route']) // Check if their is no current user
  cy.get(':nth-child(2) > .ant-menu-submenu-title').trigger('mouseover')
  cy.get('#sign-out').click({ force: true })
  cy.wait(['@logout_route'])
})
