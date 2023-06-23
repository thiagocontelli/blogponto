export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/posts/new'],
  pages: {
    signIn: '/'
  }
}