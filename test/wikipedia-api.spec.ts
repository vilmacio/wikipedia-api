import wikipedia from '../src/wikipedia-api'
import { MissingParamError } from '../src/errors/missing-param'
import { InvalidParamError } from '../src/errors/invalid-param'
import { ArticleAttributes } from '../src/protocols/article'

describe('wikipedia-api [instance]', () => {
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
  })
})
