import './globals.css'
import { Inter, Abril_Fatface, Bungee } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })
const abrilFatface = Abril_Fatface({ subsets: ['latin'], display: 'swap', weight: "400" })
const bungee = Bungee({ subsets: ['latin'], display: 'swap', weight: "400" })

export const metadata = {
  title: 'Cool Todo App',
  description: 'A cool todo app built with Next.js and Tailwind CSS.',
}

export default function RootLayout({ children }) {
  return (
    <html className={bungee.className} lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className=" bg-cool-pattern bg-cover bg-no-repeat">
      <Navbar />
      <div className="flex min-h-screen flex-col items-center">
      {children}
      <Footer />
      </div>
        
        </body>
    </html>
  )
}
