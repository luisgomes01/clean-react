import { HttpResponse } from './http-response'

export type HttpPostParams = {
  url: string
  body?: object
}

// I of SOLID: Interface segregation principle -> specific and small interfaces
export interface HttpPostClient {
  post (params: HttpPostParams): Promise<HttpResponse>
}
