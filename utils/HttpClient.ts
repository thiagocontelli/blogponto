export class HttpClient {

  constructor(
    readonly baseUrl: string
  ) {}

  private async http<T>(url: string, config: RequestInit): Promise<T> {
    const request = new Request(this.baseUrl + url, config)
    const response = await fetch(request)

    if (!response.ok) {
      throw new Error(JSON.stringify({ name: response.status, message: response.statusText }))
    }

    return response.json().catch(() => ({}))
  }

  async post<T, U>(url: string, body: T, config?: RequestInit): Promise<U> {
    const init = { method: 'post', body: JSON.stringify(body), ...config }
    return await this.http<U>(url, init)
  }

  async get<T>(path: string, config?: RequestInit): Promise<T> {
    const init = {method: 'get', ...config}
    return await this.http<T>(path, init)
  }
}