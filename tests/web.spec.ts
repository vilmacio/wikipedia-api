import { articlePage } from '../src/providers/web'
import nock from 'nock'

describe('Web Provider', () => {
  beforeAll(() => {
    nock('https://en.wikipedia.org/wiki')
      .get(/\/.*/)
      .reply(200, {
        inner: '<html>content</html>'
      })
  })

  test('should return 200 if article is found', async () => {
    const response = await articlePage('any_article', 'en')
    expect(response.statusCode).toBe(200)
  })
})
