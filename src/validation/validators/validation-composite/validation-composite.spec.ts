import { ValidationComposite } from './validation-composite'
import { FieldValidationSpy } from '../test/mock-field-validation'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationSpies: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldValidationSpies = [new FieldValidationSpy('any_field'), new FieldValidationSpy('any_field')]
  const sut = new ValidationComposite(fieldValidationSpies)

  return {
    sut, fieldValidationSpies
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const { sut, fieldValidationSpies } = makeSut()
    fieldValidationSpies[0].error = new Error('first_error_message')
    fieldValidationSpies[1].error = new Error('second_error_message')
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('first_error_message')
  })
})
