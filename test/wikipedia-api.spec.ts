import wikipedia from '../src/wikipedia-api'
import { MissingParamError } from '../src/errors/missing-param'

describe('wikipedia-api', () => {
  describe('object instance', () => {
    test('should be a function', () => {
      expect(wikipedia).toBeTruthy()
      expect(typeof wikipedia).toBe('function')
    })

    test('should throws MissingParamError if url is not provided', () => {
      expect(() => { wikipedia('') }).toThrow(new MissingParamError('url'))
    })
  })
})
