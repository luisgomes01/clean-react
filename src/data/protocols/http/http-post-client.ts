import { HttpResponse } from '.'

export type HttpPostParams<T> = {
  url: string
  body?: T
}

// I of SOLID: Interface segregation principle -> specific and small interfaces
export interface HttpPostClient<T, R> {
  post (params: HttpPostParams<T>): Promise<HttpResponse<R>>
}
