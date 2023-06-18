export class RequiredFieldError extends Error {
  constructor () {
    super('Camo obrigatório')
    this.name = 'RequiredFieldError'
  }
}
