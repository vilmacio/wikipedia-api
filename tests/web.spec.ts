import { articlePage } from '../src/providers/web'
import nock from 'nock'
import * as fetch from 'node-fetch'
import ServiceError from '../src/errors/service-error'

describe('Web Provider', () => {
  const wikipediaURL = 'https://en.wikipedia.org/wiki/any_article'

  test('should return content if article is found', async () => {
    nock('https://en.wikipedia.org/wiki')
      .get(/\/.*/)
      .reply(200, '<html>content</html>')

    const response = await articlePage(wikipediaURL)
    expect(typeof response).toBe('string')
    expect(response).toBe('<html>content</html>')
  })

  test('should return undefined if article is not found', async () => {
    nock('https://en.wikipedia.org/wiki')
      .get(/\/.*/)
      .reply(404, '<html>content</html>')

    const response = await articlePage(wikipediaURL)
    expect(response).toBeUndefined()
  })

  test('should throw ServiceError if fetch throws', async () => {
    jest.spyOn(fetch, 'default').mockImplementationOnce(() => { throw new Error() })

    await expect(async () => { await articlePage(wikipediaURL) })
      .rejects.toThrow(new ServiceError('The connection failed. Try to set a correct language.'))
  })

  test('should call fetch with correct value', async () => {
    nock('https://en.wikipedia.org/wiki')
      .get(/\/.*/)
      .reply(200, '<html>content</html>')

    const fetchSpy = jest.spyOn(fetch, 'default')
    await articlePage(wikipediaURL)
    expect(fetchSpy).toHaveBeenCalledWith(wikipediaURL)
  })
})
