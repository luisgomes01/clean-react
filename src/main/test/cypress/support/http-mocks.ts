import { faker } from '@faker-js/faker'
import { Method } from 'axios'

export const mockInvalidCredentialsError = (url: RegExp): void => {
  cy.intercept('POST', url, {
    statusCode: 401,
    body: { error: faker.random.words() }
  }).as('request')
}

export const mockUnexpectedError = (url: RegExp, method: Method): void => {
  cy.intercept(method, url, {
    statusCode: 400,
    body: { error: faker.random.words() }
  }).as('request')
}

export const mockOk = (url: RegExp, method: Method, response: any): void => {
  cy.intercept(method, url, {
    statusCode: 200,
    body: response
  }).as('request')
}
