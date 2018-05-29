describe('This section describes how to manage your Clutter handle', function() {
  it('Handles > 20 characters cannot be entered', function() {
    cy.visit('/', {
      onBeforeLoad: win => {
        win.onerror = null
      }
    })
    cy.get('#myHandle').type('12345678912345678912212')
    cy.get('#setHandleButton').click()
    cy.get('#myHandle').should('contain', '')
  })
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
    cy.get('#handle').click()
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
