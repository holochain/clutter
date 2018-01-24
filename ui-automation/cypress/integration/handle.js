describe('This section describes how to manage your Clutter handle', function () {
  before(function () {
    cy.request('http://localhost:3141')
    cy.request('http://localhost:4141')
    cy.request('http://localhost:5141')
  })
  it('Let\'s go to the Settings and set the handle others will be able to find us by', function () {
    cy.visit('http://localhost:3141')
    cy.get('#changeHandleButton').click()
    cy.get('#myHandle').type('phil')
    cy.get('#setHandleButton').click()
    cy.get('#handle').should('contain', 'phil')
  })
  it('Now go an update your handle to something new', function () {
    cy.visit('http://localhost:3141')
    cy.get('#changeHandleButton').click()
    cy.get('#myHandle').type('lucy')
    cy.get('#setHandleButton').click()
    cy.get('#handle').should('contain', 'lucy')
  })
})
