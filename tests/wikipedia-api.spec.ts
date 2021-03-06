import nock from 'nock'

import wikipedia from '../src/wikipedia-api'
import * as webProvider from '../src/providers/web'
import { MissingParamError } from '../src/errors/missing-param'
import { InvalidParamError } from '../src/errors/invalid-param'
import { ArticleAttributes } from '../src/protocols/article'

describe('WIkipedia API', () => {
  beforeAll(() => {
    nock('https://en.wikipedia.org/wiki')
      .persist()
      .get(/\/.*/)
      .reply(200, '<html>content</html>')
  })

  const wikipediaURL = 'http://en.wikipedia.org/wiki/any_article'

  describe('default', () => {
    describe('when imported', () => {
      test('should be a function', () => {
        expect(wikipedia).toBeTruthy()
        expect(typeof wikipedia).toBe('function')
      })
    })

    describe('when invoked with string parameter', () => {
      test('should throws MissingParamError if url is not provided', () => {
        expect(() => { wikipedia('') }).toThrow(new MissingParamError('url'))
      })

      test('should throws InvalidParamError if wikipedia url is invalid', () => {
        expect(() => { wikipedia('invalid_url') })
          .toThrow(new InvalidParamError('url', 'The provided wikipedia url is invalid'))
      })

      test('should return a object on success', () => {
        expect(typeof wikipedia(wikipediaURL))
          .toBe('object')
      })
    })

    describe('when invoked with object parameter', () => {
      test('should throws MissingParamError if article is not provided', () => {
        const attributes:ArticleAttributes = {
          article: null,
          lang: 'any_lang'
        }

        expect(() => { wikipedia(attributes) })
          .toThrow(new MissingParamError('article'))
      })

      test('should throws MissingParamError if lang is not provided', () => {
        const attributes:ArticleAttributes = {
          article: 'any_article',
          lang: null
        }

        expect(() => { wikipedia(attributes) })
          .toThrow(new MissingParamError('lang'))
      })

      test('should return a object on success', () => {
        const attributes:ArticleAttributes = {
          article: 'any_article',
          lang: 'any_lang'
        }

        expect(typeof wikipedia(attributes))
          .toBe('object')
      })
    })
  })

  describe('innerHTML()', () => {
    test('should call web provider with correct value', async () => {
      const articlePageSpy = jest.spyOn(webProvider, 'articlePage')
      await wikipedia(wikipediaURL).innerHTML()
      expect(articlePageSpy).toHaveBeenCalledTimes(1)
      expect(articlePageSpy).toHaveBeenCalledWith(wikipediaURL)
    })

    test('should return a string on success', async () => {
      const result = await wikipedia(wikipediaURL).innerHTML()
      expect(typeof result).toBe('string')
      expect(result).toBe('<html>content</html>')
    })
  })

  afterAll(() => {
    nock.isDone()
    nock.cleanAll()
  })
})
