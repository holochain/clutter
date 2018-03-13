describe('This section describes how to manage your Clutter handle', function () {
  before(function () {
    cy.request('POST', 'http://localhost:3141/fn/clutter/newHandle', 'agent3141')
    cy.request('POST', 'http://localhost:4141/fn/clutter/newHandle', 'agent4141')
    cy.request('POST', 'http://localhost:5141/fn/clutter/newHandle', 'agent5141')
    cy.request('POST', 'http://localhost:5141/fn/clutter/post', {"message":"A post from agent5141","stamp":1520931499163})
  })

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

describe('This section describes how to post meows', function () {
  it('Let\'s go to the main screen and post a couple of meows', function () {
    cy.visit('/')
    cy.get('#meow').type('Lucy\'s first meow!!')
    cy.get('#postMeow').click()
    cy.get('#meow').type('Lucy\'s second meow!!')
    cy.get('#postMeow').click()
  })
})
