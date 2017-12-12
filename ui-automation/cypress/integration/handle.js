describe('This section describes how to manage your Clutter handle', function(){
  it('When you first visit Clutter you will be prompted to create a handle (that\'s the name others will be able to find you by.)', function(){
    // https://on.cypress.io/visit
    cy.visit('http://localhost:4141')

    // Here we've made our first assertion using a '.should()' command.
    // An assertion is comprised of a chainer, subject, and optional value.

    // https://on.cypress.io/should
    // https://on.cypress.io/and

    // https://on.cypress.io/title
    cy.title().should('include', 'Clutter')
    //   ↲               ↲            ↲
    // subject        chainer      value
  })
})
