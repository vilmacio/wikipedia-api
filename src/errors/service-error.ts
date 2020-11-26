export default class ServiceError extends Error {
  constructor (message: string) {
    super('Service Connection Error')
    this.name = 'ServiceError'
    this.message = message
  }
}
