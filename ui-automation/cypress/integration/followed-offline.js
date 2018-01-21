describe('This section shows how even when your friends are offline you can still see their meows', function () {
  it('Try it, follow a friend and get them to go offline.)', function () {
    cy.visit('http://localhost:3141')
    // cy.title().should('include', 'Clutter')
    cy.request('http://localhost:4141')
    cy.request('http://localhost:5141')
  })
})
