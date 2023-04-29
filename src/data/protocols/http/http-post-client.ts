// Interface segregation principle -> specific interface, small interfaces

export interface HttpPostClient {
  post (url: string): Promise<void>
}
