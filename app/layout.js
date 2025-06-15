import './globals.css'

export const metadata = {
  title: 'Budayaku Chat',
  description: 'Chat dengan AI tentang budaya Indonesia',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}