describe('This section describes how to manage your Clutter handle', function() {
  it("Let's set the handle others will be able to find us by", function() {
    cy.visit('/', {
      onBeforeLoad: win => {
        win.onerror = null
      }
    })
    cy.get('#myHandle').type('phil')
    cy.get('#setHandleButton').click()

    cy.get('#handle').should('contain', 'phil')
  })
  it("Let's go to Edit Profile and set the firstName (handle stays the same)", function() {
    cy.visit('/', {
      onBeforeLoad: win => {
        win.onerror = null
      }
    })
    cy.get('#handle').should('contain', 'phil')
    cy.get('#changeHandleButton').click()
    cy
      .get('form')
      .get('#inputName')
      .should('have.value', 'phil')
    cy
      .get('form')
      .get('#inputName')
      .type('lip')
    cy.get('#saveChanges').click()
    cy.get('#handle').should('contain', 'phil')
    cy.wait(500)
  })
})
