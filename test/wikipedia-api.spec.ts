import wikipedia from '../src/wikipedia-api'
import { MissingParamError } from '../src/errors/missing-param'
import { InvalidParamError } from '../src/errors/invalid-param'

describe('wikipedia-api', () => {
  describe('object instance', () => {
    test('should be a function', () => {
      expect(wikipedia).toBeTruthy()
      expect(typeof wikipedia).toBe('function')
    })

    test('should throws MissingParamError if url is not provided', () => {
      expect(() => { wikipedia('') }).toThrow(new MissingParamError('url'))
    })

    test('should throws InvalidParamError if wikipedia url is invalid', () => {
      expect(() => { wikipedia('invalid_url') })
        .toThrow(new InvalidParamError('url', 'The url parameter must be a string'))
    })
  })
})
