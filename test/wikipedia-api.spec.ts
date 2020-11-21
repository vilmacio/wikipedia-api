import wikipedia from '../src/wikipedia-api'
import { MissingParamError } from '../src/errors/missing-param'

describe('wikipedia-api', () => {
  describe('object instance', () => {
    test('should throws MissingParamError if url is not provided', async () => {
      expect(() => { wikipedia('') }).toThrow(new MissingParamError('url'))
    })
  })
})
