import fetch from 'node-fetch'
import ServiceError from '../errors/service-error'

export const articlePage = async (article:string, lang: string):Promise<string> => {
  try {
    const url = `https://${lang}.wikipedia.org/wiki/${article}`
    const response = await fetch(url)
    if (response.status === 200) return await response.text()
  } catch (error) {
    throw new ServiceError('The connection failed. Try to set a correct language.')
  }
}
