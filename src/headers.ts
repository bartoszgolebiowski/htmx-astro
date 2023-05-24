export const isHXRequest = (request: Request) => {
    return request.headers.get('HX-Request') === 'true'
}