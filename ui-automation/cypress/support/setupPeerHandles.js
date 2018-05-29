before(function() {
  cy.request('POST', 'http://localhost:3141/fn/clutter/newHandle', 'agent3141')
  cy.wait(200)
  cy.request('POST', 'http://localhost:6141/fn/clutter/newHandle', 'agent6141')
  cy.wait(200)
  cy.request('POST', 'http://localhost:5141/fn/clutter/newHandle', 'agent5141')
  cy.wait(200)
})
