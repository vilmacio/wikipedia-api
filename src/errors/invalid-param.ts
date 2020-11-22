export class InvalidParamError extends Error {
  constructor (param: string) {
    super(`The following parameter is invalid: ${param}`)
    this.name = 'InvalidParamError'
  }
}
