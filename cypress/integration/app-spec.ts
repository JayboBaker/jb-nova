// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('App', function () {
  beforeEach(function () {
    cy.visit('/')
  })

  it('renders the app', function () {
    cy.get('[data-cy="title"]').contains('Todo App')
  })

  it('allows the user to add a todo', function () {
    const todoText = 'I have lots to do'
    cy.get('[data-cy="todo-input-description"]').type(todoText).type('{enter}')
    cy.get('[data-cy="todo-list"]').contains(todoText)
  })

  it('ensures there is a description', function () {
    const todoText = 'oo'
    cy.get('[data-cy="todo-input-description"]').type('{enter}')
    cy.get('[data-cy="todo-list"]').should('not.exist')
  })
})
