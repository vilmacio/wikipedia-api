import { articlePage } from '../src/providers/web'
import nock from 'nock'

describe('Web Provider', () => {
  beforeAll(() => {
    nock('https://en.wikipedia.org/wiki')
      .get(/\/.*/)
      .reply(200, '<html>content</html>')
  })

  test('should return content if article is found', async () => {
    const response = await articlePage('any_article', 'en')
    expect(typeof response).toBe('string')
    expect(response).toBe('<html>content</html>')
  })

  test('should return null if article is not found', async () => {
    nock('https://en.wikipedia.org/wiki')
      .get(/\/.*/)
      .reply(404, '<html>content</html>')

    const response = await articlePage('any_article', 'en')
    expect(response).toBeNull()
  })
})
