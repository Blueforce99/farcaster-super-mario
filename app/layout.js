import './globals.css'

export const metadata = {
  title: 'Super Mario | Farcaster Mini App',
  description: 'Classic Super Mario platformer game on Farcaster',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}