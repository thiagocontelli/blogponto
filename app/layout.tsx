import { Toaster } from '@/components/ui/toaster'
import { Footer, Header, ProvidersWrapper } from '@components'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog.',
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
          <div className='flex flex-col justify-between min-h-screen'>
            <Header />

            <div className='xl:mx-80 lg:mx-40 mx-4 flex-1 flex'>
              {children}
            </div>

            <Footer />
          </div>
        </ProvidersWrapper>

        <Toaster />
      </body>
    </html>
  )
}
