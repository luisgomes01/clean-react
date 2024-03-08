import { faker } from '@faker-js/faker'
import * as Helper from './http-mocks'

export const mockEmailInUseError = (): void => {
  Helper.mockEmailInUseError(/signup/)
}

export const mockUnexpectedError = (): void => {
  Helper.mockUnexpectedError(/login/, 'POST')
}

export const mockInvalidData = (): void => {
  Helper.mockOk(/login/, 'POST', { invalid: faker.random.numeric() })
}
