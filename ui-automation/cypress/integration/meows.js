import '../support/setupPeerHandles'

describe('This section describes how to post meows', function() {
  it("Let's go to the main screen and post a couple of meows", function() {
    cy.visit('/')
    cy.get('#meow').type('Your first meow!!')
    cy.get('#postMeow').click()
    cy.get('#meow').type('Your second meow!!')
    cy.get('#postMeow').click()
    cy.wait(100)

    // cy.get('.message:first').contains('Your second meow!!')
  })
  it('When you click the title of the meow you will be taken directly to that meow.', function() {
    cy.visit('/')
    cy.get('#meow').type('The meow to click on!!')
    cy.get('#postMeow').click()
    cy.wait(100)
    // cy.get('.stamp:first').click()
    // cy.get('.message:first').contains('The meow to click on!!')
  })
  it("Let's go to the main screen and post a meow with a URL", function() {
    cy.visit('/')
    cy.get('#meow').type('Your first URL meow is https://google.ca')
    cy.get('#postMeow').click()
    cy.visit('/')
    cy.get('.stamp:first').click()
    cy.get('.message a').click()
  })
})
