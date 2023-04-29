export type HttpPostParams = {
  url: string
  body?: object
}

// Interface segregation principle -> specific interface, small interfaces
export interface HttpPostClient {
  post (params: HttpPostParams): Promise<void>
}
