export type FetchSuccess = {
	status: number,
	data: []
}

export function getFetchData(url: string): Promise<FetchSuccess> {
    const headers: Headers = new Headers()

	headers.set('Content-Type', 'application/json')
	headers.set('Accept', 'application/json')

	const request: RequestInfo = new Request(url, {
		method: 'GET',
		headers: headers
	})

	return fetch(request)
    .then(res => res.json())
    .then(res => {
      return res as FetchSuccess
    })
}