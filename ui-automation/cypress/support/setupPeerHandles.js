before(function () {
  cy.request('POST', 'http://localhost:3141/fn/clutter/newHandle', 'agent3141')
  cy.wait(200)
  cy.request('POST', 'http://localhost:4141/fn/clutter/newHandle', 'agent4141')
  cy.wait(200)
  cy.request('POST', 'http://localhost:5141/fn/clutter/newHandle', 'agent5141')
  cy.wait(200)
})
