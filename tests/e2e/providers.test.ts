import nock from 'nock'
import fetch from 'node-fetch'

describe('Providers - E2E tests', () => {
  test('nock interceptor should be disable', async () => {
    const response = await fetch('https://en.wikipedia.org/wiki')
    expect(response.status).toBe(200)
    await expect(response.text()).resolves.not.toBe('<html>content</html>')
  })

  describe('Web Wikipedia', () => {
    test('should throw if network connection is disabled', async () => {
      nock.disableNetConnect()
      const promise = fetch('https://en.wikipedia.org/wiki')
      await expect(promise).rejects.toThrow()
    })

    test('should return 200 if network connection is enabled', async () => {
      nock.enableNetConnect()
      const promise = await fetch('https://en.wikipedia.org/wiki')
      expect(promise.status).toBe(200)
    })
  })

  afterEach(() => {
    nock.cleanAll()
  })
})
