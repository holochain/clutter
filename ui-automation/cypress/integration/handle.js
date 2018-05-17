describe('This section describes how to manage your Clutter handle', function () {
  it('Let\'s go to the Settings and set the handle others will be able to find us by', function () {
    cy.visit('/')
    cy.get('#changeHandleButton').click()
    cy.get('#myHandle').type('phil')
    cy.get('#setHandleButton').click()
    cy.get('#handle').should('contain', 'phil')
  })
  it('Now update your handle to something new', function () {
    cy.visit('/')
    cy.get('#changeHandleButton').click()
    cy.get('#myHandle').type('lucy')
    cy.get('#setHandleButton').click()
    cy.get('#handle').should('contain', 'lucy')
  })
})
