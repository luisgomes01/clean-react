export type HttpPostParams = {
  url: string
}

// Interface segregation principle -> specific interface, small interfaces
export interface HttpPostClient {
  post (params: HttpPostParams): Promise<void>
}
