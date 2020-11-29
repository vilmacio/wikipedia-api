import { articlePage } from '../src/providers/web'
import nock from 'nock'
import * as fetch from 'node-fetch'
import ServiceError from '../src/errors/service-error'

describe('Web Provider', () => {
  test('should return content if article is found', async () => {
    nock('https://en.wikipedia.org/wiki')
      .get(/\/.*/)
      .reply(200, '<html>content</html>')

    const response = await articlePage('any_article', 'en')
    expect(typeof response).toBe('string')
    expect(response).toBe('<html>content</html>')
  })

  test('should return undefined if article is not found', async () => {
    nock('https://en.wikipedia.org/wiki')
      .get(/\/.*/)
      .reply(404, '<html>content</html>')

    const response = await articlePage('any_article', 'en')
    expect(response).toBeUndefined()
  })

  test('should throw ServiceError if fetch throws', async () => {
    jest.spyOn(fetch, 'default').mockImplementationOnce(() => { throw new Error() })

    await expect(async () => { await articlePage('any_article', 'en') })
      .rejects.toThrow(new ServiceError('The connection failed. Try to set a correct language.'))
  })

  test('should call fetch with correct value', async () => {
    nock('https://en.wikipedia.org/wiki')
      .get(/\/.*/)
      .reply(200, '<html>content</html>')

    const params = {
      article: 'any_article',
      lang: 'en'
    }
    const fetchSpy = jest.spyOn(fetch, 'default')
    await articlePage(params.article, params.lang)
    expect(fetchSpy).toHaveBeenCalledWith(`https://${params.lang}.wikipedia.org/wiki/${params.article}`)
  })
})
