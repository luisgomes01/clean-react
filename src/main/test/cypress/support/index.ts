import { mount } from 'cypress/react'

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
      getByTestId: (id: string) => Chainable<JQuery<HTMLElement>>
    }
  }
}

Cypress.Commands.add('getByTestId', (id) => cy.get(`[data-testid=${id}]`))
