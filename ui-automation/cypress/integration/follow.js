import '../support/setupPeerHandles'
import '../support/setupPeerMeows'

describe('This section shows how to follow someone and see their meows', function() {
  it('Try it, follow a friend and watch their meows show up in your feed', function() {
    cy.visit('/')
    cy.get('#followButton').click()
    cy.get('.following-handle button:first').click()
    cy.get('#close').click()
    cy.url().should('eq', 'http://localhost:4141/')
  })
})
