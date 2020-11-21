export class MissingParamError extends Error {
  constructor (param: string) {
    super(`The following parameter is missing: ${param}`)
    this.name = 'MissingParamError'
  }
}
