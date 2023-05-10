import Provider from '@/components/Provider'
import '@/style/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'v13bruh',
  description: 'Wanna do something new ge',
}

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider>
      {children}
    </Provider>
  )
}
