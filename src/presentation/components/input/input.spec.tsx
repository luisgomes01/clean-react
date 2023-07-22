import React from 'react'
import { RenderResult, render } from '@testing-library/react'
import Input from './input'
import FormContext from '@/presentation/contexts/form/form-context'

const makeSut = (): RenderResult => {
  return render(
    <FormContext.Provider value={{ state: {} }}>
      <Input name="field" />
    </FormContext.Provider>
  )
}

describe('Input Component', () => {
  test('Should begin with readonly', () => {
    const sut = makeSut()
    const input = sut.getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
