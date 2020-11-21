import { MissingParamError } from './errors/missing-param'
import { ArticleAttributes } from './protocols/article'

export = function wikipedia (url: string | ArticleAttributes) {
  return (() => {
    throw new MissingParamError('url')
  })()
}
