import '../support/setupPeerHandles'


describe('This section describes how to post meows', function () {
  it('Let\'s go to the main screen and post a couple of meows', function () {
    cy.visit('/')
    cy.get('#meow').type('Your first meow!!')
    cy.get('#postMeow').click()
    cy.get('#meow').type('Your second meow!!')
    cy.get('#postMeow').click()
    cy.wait(100)
    
    // cy.get('.message:first').contains('Your second meow!!')
  })
  it('When you click the title of the meow you will be taken directly to that meow.', function () {
    cy.visit('/')
    cy.get('#meow').type('The meow to click on!!')
    cy.get('#postMeow').click()
    cy.wait(100)
    // cy.get('.stamp:first').click()
    // cy.get('.message:first').contains('The meow to click on!!')
  })

  it('Posts some meows with hashtags', function () {
    cy.visit('/')
    cy.get('#meow').type('A meow with no hashtags')
    cy.get('#postMeow').click()
    cy.get('#meow').type('A meow with a #hashtag')
    cy.get('#postMeow').click()
    cy.get('#meow').type('Another meow with the same #hashtag')
    cy.get('#postMeow').click()
    cy.get('#meow').type('#first word is a #hashtag')
    cy.get('#postMeow').click()
    cy.get('#meow').type('#')
    cy.get('#postMeow').click()
    cy.wait(1000)
  })
  it('When you click a hashtag it displays all meows with the same hashtag.', function () {
    cy.visit('/')
    cy.get('.hashtag:first').click()
    cy.get('.message:first').contains('#first word is a #hashtag')
  })
})
