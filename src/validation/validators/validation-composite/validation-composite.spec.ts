import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '@/validation/test'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpies: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidationSpies = [new FieldValidationSpy(fieldName), new FieldValidationSpy(fieldName)]
  const sut = ValidationComposite.build(fieldValidationSpies)

  return {
    sut, fieldValidationSpies
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationSpies } = makeSut(fieldName)
    const errorMessage = faker.random.words()
    fieldValidationSpies[0].error = new Error(errorMessage)
    fieldValidationSpies[1].error = new Error(faker.random.words())
    const error = sut.validate(fieldName, { [fieldName]: faker.random.words() })
    expect(error).toBe(error)
  })

  test('Should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate(fieldName, { [fieldName]: faker.random.words() })
    expect(error).toBeFalsy()
  })
})
