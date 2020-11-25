import request from 'request'

export const articlePage = async (article:string, lang: string):Promise<any> => {
  return new Promise((resolve, reject) => {
    request(`https://${lang}.wikipedia.org/wiki/${article}`, {
      method: 'GET'
    }, (err, result) => {
      if (err) {
        return null
      }
      resolve(result)
    })
  })
}
