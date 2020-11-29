import fetch from 'node-fetch'
import ServiceError from '../errors/service-error'

export const articlePage = async (url: string):Promise<string> => {
  try {
    const response = await fetch(url)
    if (response.status === 200) return await response.text()
  } catch (error) {
    throw new ServiceError('The connection failed. Try to set a correct language.')
  }
}
