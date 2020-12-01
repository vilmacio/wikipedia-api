import wikipedia from '../../src/wikipedia-api'

describe('Wikipedia API - E2E test', () => {
  describe('innerHTML()', () => {
    test('should return html content without script tags', async () => {
      const response = await wikipedia('https://en.wikipedia.org/wiki/Michael_Jackson').innerHTML()
      expect(response.search(/<script.*>.*<\/script>/)).toBeLessThan(0)
    })
  })
})
