import { Header } from './components'
import ProvidersWrapper from './components/ProvidersWrapper'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog',
  description: 'A amazing blog.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " select-none"}>
        <ProvidersWrapper>
          <Header />

          <div className='xl:mx-80 lg:mx-40 mx-4'>
            {children}
          </div>
        </ProvidersWrapper>
      </body>
    </html>
  )
}
