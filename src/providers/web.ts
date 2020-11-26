import request from 'request'
import ServiceError from '../errors/service-error'

export const articlePage = async (article:string, lang: string):Promise<any> => {
  return new Promise((resolve, reject) => {
    request(`https://${lang}.wikipedia.org/wiki/${article}`, {
      method: 'GET'
    }, (err, result) => {
      if (err) {
        throw new ServiceError('The connection failed. Try to set a correct language.')
      }
      if (result.statusCode === 404) resolve(null)
      if (result.statusCode === 200) resolve(result.body)
    })
  })
}
