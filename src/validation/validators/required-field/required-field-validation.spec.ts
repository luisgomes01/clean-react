import { RequiredFieldValidation } from './required-field-validation'
import { RequiredFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'

const makeSut = (field): RequiredFieldValidation => new RequiredFieldValidation(field)

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return falsy if field is not empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.words() })
    expect(error).toBeFalsy()
  })
})
