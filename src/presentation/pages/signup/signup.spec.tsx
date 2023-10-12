import React from 'react'
import Signup from './signup'
import { RenderResult, render } from '@testing-library/react'
import { Helper } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult

}

const makeSut = (): SutTypes => {
  const sut = render(<Signup />)

  return {
    sut
  }
}

describe('Signup Component', () => {
  test('Should start with inital state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut()

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
