import { faker } from '@faker-js/faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Should load with correct initial state', () => {
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Campo obrigatório')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.random.word())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Valor inválido')
      .should('contain.text', '🔴')
    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Quantidade de caracteres inválida')
      .should('contain.text', '🔴')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')
    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))
    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Tudo certo!')
      .should('contain.text', '🟢')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('Should present invalidCredentialsError on 401', () => {
    cy.intercept('POST', 'auth/login', {
      statusCode: 401,
      body: { error: faker.random.words() }
    })
    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Invalid Credentials')
    cy.url().should('equal', `${baseUrl}/login`)
  })

  it('Should present UnexpectedError on 400', () => {
    cy.intercept('POST', 'auth/login', {
      statusCode: 400,
      body: { error: faker.random.words() }
    })
    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Unexpected Error was thrown. Try again soon.')
    cy.url().should('equal', `${baseUrl}/login`)
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    cy.intercept('POST', 'auth/login', {
      statusCode: 200,
      body: { invalidProperty: faker.random.numeric() }
    })
    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.random.alphaNumeric(5) + '{enter}')
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Unexpected Error was thrown. Try again soon.')
    cy.url().should('equal', `${baseUrl}/login`)
  })

  it('Should save accessToken if valid credentials are provided', () => {
    cy.intercept('POST', 'auth/login', {
      statusCode: 200,
      body: { accessToken: faker.random.numeric() }
    })
    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()
    cy.getByTestId('main-error').should('not.exist')
    cy.url().should('equal', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })

  it('Should prevent multiple submits', () => {
    cy.intercept('POST', 'auth/login', {
      statusCode: 200,
      body: { accessToken: faker.random.numeric() }
    }).as('request')
    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email())
    cy.getByTestId('password').focus()
    cy.getByTestId('password').type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('Should not call submit if form is invalid', () => {
    cy.intercept('POST', 'auth/login', {
      statusCode: 200,
      body: { accessToken: faker.random.numeric() }
    }).as('request')
    cy.getByTestId('email').focus()
    cy.getByTestId('email').type(faker.internet.email() + '{enter}')
    cy.get('@request.all').should('have.length', 0)
  })
})
