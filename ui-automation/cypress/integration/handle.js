describe('This section describes how to manage your Clutter handle', function(){
  it('Let\'s check that all 3 instances of Clutter are running.)', function(){
    // https://on.cypress.io/visit
    cy.visit('http://localhost:3141')
    cy.title().should('include', 'Clutter')
    cy.request('http://localhost:4141')
    cy.request('http://localhost:5141')
  })
})
