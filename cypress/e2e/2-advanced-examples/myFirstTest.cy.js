context('My First Test', () => {
  beforeEach(() => {
    cy.visit('/commands/actions')
    cy.fixture('example').then(function (data) {
      this.data = data
      cy.log('THIS', this.data)
    })
  })
  it('has an h1 on the page.', () => {
    cy.get('h1').should('exist')
  })

  it('renders the correct h1 text.', () => {
    cy.get('h1').should('contain.text', 'Actions')
  })

  it('renders a paragraph under the h1.', () => {
    cy.get('.container').eq(1).find('p').should('exist')
  })

  it('renders a section with the correct elements.', () => {
    cy.get('.container')
      .eq(2)
      .within(() => {
        cy.get('h4').should('exist')
        cy.get('p').should('exist')
      })
  })
  it('correctly renders the cypress webstite link', () => {
    cy.findByText(Cypress.env('navBarText')).should('exist')
  })

  it('types into an email field', () => {
    cy.visit('/commands/actions')
    cy.findByPlaceholderText('Email').type('luio.poveda@gmail.com')
    cy.wait(2000).then(() => {
      fetch('https://api.spacexdata.com/v3/missions')
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        })
    })
  })
  it('Shows an active class for the current page', () => {
    cy.get('.dropdown-menu').find('li').eq(2).should('have.class', 'active')
  })

  it('Should ot have an active class on inactive pages', () => {
    cy.get('.dropdown-menu')
      .should('not.have.class', 'active')
      .find('a')
      .should('have.attr', 'href', '/commands/querying')
  })
  it('links to the actions page correctly', () => {
    cy.visit('/')
    cy.findAllByText('Actions').first().click({ force: true })
    cy.url().should('include', 'commands/actions')
  })

  it("let's you type in an input field", () => {
    cy.visit('/commands/actions')
    cy.findByLabelText('Describe:')
      .type('Test description')
      .should('have.value', 'Test description')
      .clear()
      .should('have.value', '')
  })

  it("let's you check a checkbox", () => {
    cy.visit('/commands/actions')
    cy.get('.action-checkboxes [type="checkbox"]')
      .eq(1)
      .check({ force: true })
      .should('be.checked')
  })
  // WHAT ARE CYPRESS HOCKS?
  before(() => {
    cy.request({
      method: 'GET',
      url: 'https://api.spacexdata.com/v3/missions',
    })
  })

  afterEach(() => {
    cy.log('After each hook is here')
  })

  after(() => {
    cy.log('the final after hook rund once')
  })

  it('has an h1 on the page', () => {
    cy.get('h1').should('exist')
  })

  it('renders the correct h1 text', () => {
    cy.get('h1').should('contain.text', 'Actions')
  })

  // FIXTURES

  it('pulls data from a fixture', () => {
    cy.fixture('example').then((data) => {
      cy.log('DATA', data)
    })
  })

  it('updates fixture data inline', () => {
    cy.fixture('example').then((data) => {
      data.email = 'lucio.poveda@gmail.com'
      cy.log('UPDATED', data)
    })
  })

  // MOUSE

  it('Triggers a popover on click', () => {
    cy.get('.action-btn').click()
    cy.findByText('This popover shows up on click').should('be.visible')
  })

  it('can click on different sections of a canvas ', () => {
    cy.get('#action-canvas').click('top')
    cy.get('#action-canvas').click('bottomRight')
    cy.get('#action-canvas').click(80, 100)
  })

  it('can double cick to edit', () => {
    cy.get('.action-div').dblclick().should('not.be.visible')
    cy.get('.action-input-hidden').should('be.visible')
  })

  it('can right cick to edit', () => {
    cy.get('.rightclick-action-div').rightclick().should('not.be.visible')
    cy.get('.rightclick-action-input-hidden').should('be.visible')
  })
})
