export class InvalidParamError extends Error {
  constructor (param: string, message:string) {
    super(`The following parameter is invalid: ${param}\n${message}`)
    this.name = 'InvalidParamError'
  }
}
