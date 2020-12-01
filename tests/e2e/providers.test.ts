import fetch from 'node-fetch'

describe('Providers - E2E tests', () => {
  test('nock interceptor should be disable', async () => {
    const response = await fetch('https://en.wikipedia.org/wiki')
    expect(response.status).toBe(200)
    await expect(response.text()).resolves.not.toBe('<html>content</html>')
  })
})
