import { InvalidParamError } from './errors/invalid-param'
import { MissingParamError } from './errors/missing-param'
import { ArticleAttributes } from './protocols/article'

export = function wikipedia (url: string | ArticleAttributes) {
  return (() => {
    paramVerificator()

    return {

    }
  })()

  function paramVerificator () {
    if (!url) throw new MissingParamError('url')
    if (typeof url === 'string') {
      stringValidation()
    } else {
      objectValidation()
    }

    function stringValidation () {
      if (String(url).search(/^https?:\/\/...?\.wikipedia\.org\/wiki\//) !== 0) {
        throw new InvalidParamError('url', 'The provided wikipedia url is invalid')
      }
    }

    function objectValidation () {
      const requiredAttributes = ['article', 'lang']
      for (const attribute of requiredAttributes) {
        if (!url[attribute]) {
          throw new MissingParamError(attribute)
        }
      }
    }
  }
}
