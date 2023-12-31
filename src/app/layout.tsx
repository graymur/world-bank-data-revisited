import './globals.css'
import { Inter } from 'next/font/google'
import Menu from '../components/Menu'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'World Bank data revisited',
	description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="min-h-screen p-4">
					<div className="max-w-screen-lg" style={{ margin: '0 auto' }}>
						<Menu />
						{children}
					</div>
				</main>
			</body>
		</html>
	)
}
