export class UnexpectedError extends Error {
  constructor () {
    super('Unexpected Error was thrown. Try again soon.')
    this.name = 'UnexpectedError'
  }
}
